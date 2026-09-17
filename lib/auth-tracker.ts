import { prisma } from "@/lib/prisma";
import type { AuthActionType } from "@prisma/client";

export interface TrackActivityParams {
  userId: string;
  action: AuthActionType;
  ipAddress?: string | null;
  userAgent?: string | null;
  deviceInfo?: string | null;
  provider?: string | null;
  metadata?: Record<string, unknown> | null;
}

/**
 * Record a user auth activity log and update user status (online/login/logout timestamps)
 */
export async function recordAuthActivity({
  userId,
  action,
  ipAddress,
  userAgent,
  deviceInfo,
  provider,
  metadata,
}: TrackActivityParams) {
  try {
    const isLogin = action === "LOGIN" || action === "SIGNUP";
    const isLogout = action === "LOGOUT";
    const now = new Date();

    // 1. Create activity log entry
    await prisma.userActivityLog.create({
      data: {
        userId,
        action,
        ipAddress: ipAddress || null,
        userAgent: userAgent || null,
        deviceInfo: deviceInfo || null,
        provider: provider || null,
        metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : undefined,
        timestamp: now,
      },
    });

    // 2. Update user status & timestamps
    await prisma.user.update({
      where: { id: userId },
      data: {
        isOnline: isLogin ? true : isLogout ? false : undefined,
        ...(isLogin ? { lastLoginAt: now } : {}),
        ...(isLogout ? { lastLogoutAt: now } : {}),
      },
    });
  } catch (err) {
    console.error("Failed to record auth activity log:", err);
  }
}

/**
 * Helper to extract client IP and user-agent from standard Request headers
 */
export function extractClientMetadata(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ipAddress = forwardedFor
    ? forwardedFor.split(",")[0].trim()
    : realIp || null;

  const userAgent = request.headers.get("user-agent") || null;

  let deviceInfo = "Desktop/Browser";
  if (userAgent) {
    if (/mobile/i.test(userAgent)) deviceInfo = "Mobile";
    else if (/tablet|ipad/i.test(userAgent)) deviceInfo = "Tablet";
    else if (/android/i.test(userAgent)) deviceInfo = "Android";
    else if (/iphone|ios/i.test(userAgent)) deviceInfo = "iPhone / iOS";
  }

  return { ipAddress, userAgent, deviceInfo };
}
