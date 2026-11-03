import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

/**
 * Standard API error class with HTTP status code and error code.
 */
export class ApiError extends Error {
  public statusCode: number;
  public code: string;
  public details?: unknown;

  constructor(
    statusCode: number,
    message: string,
    code = "API_ERROR",
    details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }

  static badRequest(message: string, code = "BAD_REQUEST", details?: unknown) {
    return new ApiError(400, message, code, details);
  }

  static unauthorized(message = "प्रमाणीकरण आवश्यक है (Unauthorized)", code = "UNAUTHORIZED") {
    return new ApiError(401, message, code);
  }

  static forbidden(message = "अनधिकृत पहुंच (Forbidden)", code = "FORBIDDEN") {
    return new ApiError(403, message, code);
  }

  static notFound(message = "संसाधन नहीं मिला (Resource not found)", code = "NOT_FOUND") {
    return new ApiError(404, message, code);
  }

  static conflict(message: string, code = "CONFLICT", details?: unknown) {
    return new ApiError(409, message, code, details);
  }

  static unprocessable(message: string, details?: unknown) {
    return new ApiError(422, message, "VALIDATION_ERROR", details);
  }
}

/**
 * Standard API Response Generator
 */
export class ApiResponse {
  /**
   * Standard Success JSON Response
   */
  static success<T>(
    data: T,
    message?: string,
    status = 200,
    meta?: Record<string, unknown>
  ) {
    return NextResponse.json(
      {
        success: true,
        data,
        ...(message ? { message } : {}),
        ...(meta ? { meta } : {}),
        timestamp: new Date().toISOString(),
      },
      { status }
    );
  }

  /**
   * Standard 201 Created Response
   */
  static created<T>(data: T, message?: string) {
    return this.success(data, message, 201);
  }

  /**
   * Standard Error JSON Response
   */
  static error(
    message: string,
    status = 500,
    code = "INTERNAL_SERVER_ERROR",
    details?: unknown
  ) {
    return NextResponse.json(
      {
        success: false,
        error: message, // Backward-compatible string for toast.error(data.error)
        code,
        ...(details !== undefined ? { details } : {}),
        timestamp: new Date().toISOString(),
      },
      { status }
    );
  }
}

/**
 * Global Error Handler Filter
 * Converts any caught error (Prisma, Zod, ApiError, SyntaxError, etc.) into standard ApiResponse.
 */
export function handleApiError(error: unknown) {
  console.error("[API_ERROR_FILTER]", error);

  // 1. Handled Custom ApiError
  if (error instanceof ApiError) {
    return ApiResponse.error(
      error.message,
      error.statusCode,
      error.code,
      error.details
    );
  }

  // 2. Zod Validation Errors
  if (error instanceof ZodError) {
    const formattedErrors = error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
    const primaryMessage = formattedErrors[0]?.message || "अमान्य इनपुट डेटा (Validation failed)";
    return ApiResponse.error(
      primaryMessage,
      422,
      "VALIDATION_ERROR",
      formattedErrors
    );
  }

  // 3. Prisma Database Errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      // P2002: Unique constraint violation
      case "P2002": {
        const target = (error.meta?.target as string[] | string) || "";
        const targetStr = Array.isArray(target) ? target.join(", ") : String(target);
        
        let userMessage = `एक अद्वितीय बाधा उल्लंघन हुआ (${targetStr})`;

        if (targetStr.includes("vdoVideoId") || targetStr.includes("Video_vdoVideoId_key")) {
          userMessage = "यह Video ID पहले से किसी अन्य पाठ (Lesson) में उपयोग की जा चुकी है। कृपया एक अलग Video ID दर्ज करें।";
        } else if (targetStr.includes("email") || targetStr.includes("User_email_key")) {
          userMessage = "यह ईमेल पहले से पंजीकृत है। कृपया लॉगिन करें या दूसरा ईमेल दर्ज करें।";
        } else if (targetStr.includes("mobile") || targetStr.includes("User_mobile_key")) {
          userMessage = "यह मोबाइल नंबर पहले से पंजीकृत है।";
        } else if (targetStr.includes("slug") || targetStr.includes("Course_slug_key")) {
          userMessage = "इस शीर्षक (Slug) का कोर्स पहले से मौजूद है। कृपया शीर्षक बदलें।";
        } else if (targetStr.includes("lessonId")) {
          userMessage = "इस पाठ (Lesson) के लिए वीडियो/सामग्री पहले से मौजूद है।";
        }

        return ApiResponse.error(
          userMessage,
          409,
          "UNIQUE_CONSTRAINT_VIOLATION",
          {
            field: targetStr,
            prismaCode: error.code,
          }
        );
      }

      // P2025: Record not found
      case "P2025": {
        return ApiResponse.error(
          "अनुरोधित रिकॉर्ड नहीं मिला या पहले ही हटाया जा चुका है।",
          404,
          "RECORD_NOT_FOUND",
          { prismaCode: error.code }
        );
      }

      // P2003: Foreign key constraint violation
      case "P2003": {
        const fieldName = (error.meta?.field_name as string) || "reference";
        return ApiResponse.error(
          `विदेशी कुंजी बाधा विफल: संबंधित रिकॉर्ड (${fieldName}) मौजूद नहीं है।`,
          400,
          "FOREIGN_KEY_VIOLATION",
          { prismaCode: error.code }
        );
      }

      // P2014: Relation constraint violation
      case "P2014": {
        return ApiResponse.error(
          "संबंधित रिकॉर्ड के कारण इस क्रिया को पूरा नहीं किया जा सका।",
          400,
          "RELATION_VIOLATION",
          { prismaCode: error.code }
        );
      }

      default: {
        return ApiResponse.error(
          `डेटाबेस त्रुटि: ${error.message.split("\n").pop() || "अज्ञात डेटाबेस समस्या"}`,
          500,
          `PRISMA_${error.code}`,
          { prismaCode: error.code }
        );
      }
    }
  }

  // 4. Invalid JSON Body
  if (error instanceof SyntaxError && "body" in error) {
    return ApiResponse.error(
      "अनुरोध बॉडी में अमान्य JSON डेटा है।",
      400,
      "INVALID_JSON_BODY"
    );
  }

  // 5. Standard Error
  if (error instanceof Error) {
    return ApiResponse.error(
      error.message || "आंतरिक सर्वर त्रुटि हुई।",
      500,
      "INTERNAL_SERVER_ERROR"
    );
  }

  // 6. Unknown fallback
  return ApiResponse.error(
    "एक अज्ञात आंतरिक सर्वर त्रुटि हुई।",
    500,
    "UNKNOWN_ERROR"
  );
}

/**
 * Higher-Order Function: withErrorHandler
 * Wraps Route Handlers (GET, POST, PATCH, DELETE) to globally intercept uncaught errors.
 */
export function withErrorHandler<
  TArgs extends unknown[],
  TReturn extends Response | NextResponse
>(
  handler: (...args: TArgs) => Promise<TReturn>
): (...args: TArgs) => Promise<Response | NextResponse> {
  return async (...args: TArgs) => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleApiError(error);
    }
  };
}

