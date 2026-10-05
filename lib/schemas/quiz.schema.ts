import { z } from "zod";

// ==========================================
// QUESTION OPTION SCHEMAS & DTOS
// ==========================================

export const CreateQuestionOptionSchema = z.object({
  optionText: z.string().min(1, "Option text cannot be empty"),
  isCorrect: z.boolean().default(false),
  order: z.coerce.number().int().nonnegative().default(0),
});
export type CreateQuestionOptionDTO = z.infer<typeof CreateQuestionOptionSchema>;

// ==========================================
// QUESTION SCHEMAS & DTOS
// ==========================================

export const CreateQuestionSchema = z.object({
  quizId: z.string().optional(), // optional when nested inside CreateQuiz
  question: z.string().min(1, "Question text cannot be empty"),
  marks: z.coerce.number().int().positive().default(1),
  order: z.coerce.number().int().nonnegative().default(0),
  options: z.array(CreateQuestionOptionSchema).min(2, "At least 2 options are required"),
});
export type CreateQuestionDTO = z.infer<typeof CreateQuestionSchema>;

export const UpdateQuestionSchema = z.object({
  question: z.string().min(1).optional(),
  marks: z.coerce.number().int().positive().optional(),
  order: z.coerce.number().int().nonnegative().optional(),
  options: z.array(CreateQuestionOptionSchema).min(2).optional(),
});
export type UpdateQuestionDTO = z.infer<typeof UpdateQuestionSchema>;

// ==========================================
// QUIZ SCHEMAS & DTOS
// ==========================================

export const CreateQuizSchema = z.object({
  lessonId: z.string().min(1).optional().nullable(), // Inline lesson quiz
  moduleId: z.string().min(1).optional().nullable(), // Module-level assessment
  title: z.string().min(2, "Quiz title must be at least 2 characters").max(200),
  description: z.string().optional().nullable(),
  passingPercentage: z.coerce.number().int().min(1).max(100).default(60),
  timeLimit: z.coerce.number().int().positive().optional().nullable(), // minutes
  attemptLimit: z.coerce.number().int().positive().optional().nullable(),
  questions: z.array(CreateQuestionSchema).optional(),
}).refine((data) => data.lessonId || data.moduleId, {
  message: "Either lessonId or moduleId must be provided",
});
export type CreateQuizDTO = z.infer<typeof CreateQuizSchema>;

export const UpdateQuizSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  description: z.string().optional().nullable(),
  passingPercentage: z.coerce.number().int().min(1).max(100).optional(),
  timeLimit: z.coerce.number().int().positive().optional().nullable(),
  attemptLimit: z.coerce.number().int().positive().optional().nullable(),
});
export type UpdateQuizDTO = z.infer<typeof UpdateQuizSchema>;

// ==========================================
// QUIZ ATTEMPT & SUBMISSION SCHEMAS & DTOS
// ==========================================

export const SubmitQuizAnswerSchema = z.object({
  questionId: z.string().min(1, "Question ID is required"),
  selectedOptionId: z.string().nullable().optional(),
});
export type SubmitQuizAnswerDTO = z.infer<typeof SubmitQuizAnswerSchema>;

export const SubmitQuizAttemptSchema = z.object({
  quizId: z.string().min(1, "Quiz ID is required"),
  userId: z.string().min(1, "User ID is required"),
  enrollmentId: z.string().optional(), // Links attempt to enrollment context
  answers: z.array(SubmitQuizAnswerSchema).min(1, "At least one answer must be submitted"),
});
export type SubmitQuizAttemptDTO = z.infer<typeof SubmitQuizAttemptSchema>;

export const QuizAttemptResultDTO = z.object({
  attemptId: z.string(),
  quizId: z.string(),
  userId: z.string(),
  score: z.number(),
  totalMarks: z.number(),
  percentage: z.number(),
  isPassed: z.boolean(),
  certificateGenerated: z.boolean(),
  certificateId: z.string().optional(),
});
export type QuizAttemptResultDTO = z.infer<typeof QuizAttemptResultDTO>;
