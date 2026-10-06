/**
 * Unit tests for course flow services.
 * Uses jest.mock to avoid real DB calls.
 */

const mockPrisma = {
  course: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    count: jest.fn(),
  },
  lesson: { count: jest.fn(), findUnique: jest.fn() },
  lessonProgress: { count: jest.fn(), findUnique: jest.fn(), upsert: jest.fn() },
  courseModuleProgress: {
    findUnique: jest.fn(),
    upsert: jest.fn(),
    count: jest.fn(),
    findMany: jest.fn(),
  },
  courseModule: { findUnique: jest.fn(), count: jest.fn(), findMany: jest.fn() },
  enrollment: { findUnique: jest.fn(), update: jest.fn() },
  certificate: { findUnique: jest.fn(), create: jest.fn() },
  quizAttempt: { findMany: jest.fn(), count: jest.fn() },
  $transaction: jest.fn(),
};

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: mockPrisma,
  prisma: mockPrisma,
}));

jest.mock("@/services/user-profile.service", () => ({
  resolvePrismaUserId: jest.fn().mockResolvedValue("user-prisma-id"),
}));

// =====================================================================
// 1. QUIZ SCHEMA — lessonId or moduleId must be present
// =====================================================================
describe("CreateQuizSchema validation", () => {
  const { CreateQuizSchema } = require("@/lib/schemas/quiz.schema");

  it("accepts quiz with lessonId only", () => {
    const result = CreateQuizSchema.safeParse({
      lessonId: "lesson-1",
      title: "Lesson Quiz",
      passingPercentage: 60,
    });
    expect(result.success).toBe(true);
  });

  it("accepts quiz with moduleId only", () => {
    const result = CreateQuizSchema.safeParse({
      moduleId: "module-1",
      title: "Module Quiz",
      passingPercentage: 70,
    });
    expect(result.success).toBe(true);
  });

  it("rejects quiz with neither lessonId nor moduleId", () => {
    const result = CreateQuizSchema.safeParse({
      title: "Orphan Quiz",
      passingPercentage: 60,
    });
    expect(result.success).toBe(false);
  });
});

// =====================================================================
// 2. SubmitQuizAttemptSchema — enrollmentId is optional
// =====================================================================
describe("SubmitQuizAttemptSchema", () => {
  const { SubmitQuizAttemptSchema } = require("@/lib/schemas/quiz.schema");

  it("accepts submission without enrollmentId", () => {
    const result = SubmitQuizAttemptSchema.safeParse({
      quizId: "quiz-1",
      userId: "user-1",
      answers: [{ questionId: "q-1", selectedOptionId: "opt-1" }],
    });
    expect(result.success).toBe(true);
    expect(result.data.enrollmentId).toBeUndefined();
  });

  it("accepts submission with enrollmentId", () => {
    const result = SubmitQuizAttemptSchema.safeParse({
      quizId: "quiz-1",
      userId: "user-1",
      enrollmentId: "enr-1",
      answers: [{ questionId: "q-1", selectedOptionId: "opt-1" }],
    });
    expect(result.success).toBe(true);
    expect(result.data.enrollmentId).toBe("enr-1");
  });
});

// =====================================================================
// 3. module-progress.service — checkAndCompleteModule
// =====================================================================
describe("checkAndCompleteModule", () => {
  const { checkAndCompleteModule } = require("@/services/module-progress.service");

  beforeEach(() => jest.clearAllMocks());

  it("returns moduleCompleted=false when not all lessons are done", async () => {
    (mockPrisma.lesson.count as jest.Mock).mockResolvedValue(5);
    (mockPrisma.lessonProgress.count as jest.Mock).mockResolvedValue(3);
    (mockPrisma.courseModuleProgress.upsert as jest.Mock).mockResolvedValue({});

    const result = await checkAndCompleteModule("user-1", "module-1", "enr-1");
    expect(result.moduleCompleted).toBe(false);
    expect(result.courseCompleted).toBe(false);
  });

  it("marks module complete when all lessons are done", async () => {
    (mockPrisma.lesson.count as jest.Mock).mockResolvedValue(5);
    (mockPrisma.lessonProgress.count as jest.Mock).mockResolvedValue(5);
    (mockPrisma.courseModuleProgress.upsert as jest.Mock).mockResolvedValue({});
    (mockPrisma.courseModule.findUnique as jest.Mock).mockResolvedValue({ courseId: "course-1" });
    (mockPrisma.courseModule.count as jest.Mock).mockResolvedValue(3);
    (mockPrisma.courseModuleProgress.count as jest.Mock).mockResolvedValue(2); // not all modules done

    const result = await checkAndCompleteModule("user-1", "module-1", "enr-1");
    expect(result.moduleCompleted).toBe(true);
    expect(result.courseCompleted).toBe(false);
    expect(mockPrisma.courseModuleProgress.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { userId_moduleId: { userId: "user-1", moduleId: "module-1" } },
        update: expect.objectContaining({ isCompleted: true }),
      })
    );
  });

  it("triggers course completion when all modules are done", async () => {
    (mockPrisma.lesson.count as jest.Mock).mockResolvedValue(4);
    (mockPrisma.lessonProgress.count as jest.Mock).mockResolvedValue(4);
    (mockPrisma.courseModuleProgress.upsert as jest.Mock).mockResolvedValue({});
    (mockPrisma.courseModule.findUnique as jest.Mock).mockResolvedValue({ courseId: "course-1" });
    (mockPrisma.courseModule.count as jest.Mock).mockResolvedValue(2);
    (mockPrisma.courseModuleProgress.count as jest.Mock).mockResolvedValue(2); // all done
    (mockPrisma.enrollment.update as jest.Mock).mockResolvedValue({});
    // Certificate check — no module quizzes
    (mockPrisma.courseModule.findMany as jest.Mock).mockResolvedValue([{ quizzes: [] }]);
    (mockPrisma.certificate.findUnique as jest.Mock).mockResolvedValue(null);
    (mockPrisma.certificate.create as jest.Mock).mockResolvedValue({ id: "cert-1" });

    const result = await checkAndCompleteModule("user-1", "module-2", "enr-1");
    expect(result.courseCompleted).toBe(true);
    expect(mockPrisma.enrollment.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ status: "COMPLETED" }) })
    );
  });
});

// =====================================================================
// 4. certificate.service — autoIssueCertificate
// =====================================================================
describe("autoIssueCertificate", () => {
  const { autoIssueCertificate } = require("@/services/certificate.service");

  beforeEach(() => jest.clearAllMocks());

  it("returns existing certificate if already issued", async () => {
    const existing = { id: "cert-existing", certificateNumber: "CERT-123" };
    (mockPrisma.certificate.findUnique as jest.Mock).mockResolvedValue(existing);

    const result = await autoIssueCertificate("user-1", "course-1", "enr-1");
    expect(result?.certificate).toEqual(existing);
    expect(mockPrisma.certificate.create).not.toHaveBeenCalled();
  });

  it("does not issue certificate if a module quiz was not passed", async () => {
    (mockPrisma.certificate.findUnique as jest.Mock).mockResolvedValue(null);
    (mockPrisma.courseModule.findMany as jest.Mock).mockResolvedValue([
      { quizzes: [{ id: "quiz-1" }] },
    ]);
    (mockPrisma.quizAttempt.findMany as jest.Mock).mockResolvedValue([]); // no passing attempts

    const result = await autoIssueCertificate("user-1", "course-1", "enr-1");
    expect(result).toBeNull();
    expect(mockPrisma.certificate.create).not.toHaveBeenCalled();
  });

  it("issues certificate when all module quizzes are passed", async () => {
    (mockPrisma.certificate.findUnique as jest.Mock).mockResolvedValue(null);
    (mockPrisma.courseModule.findMany as jest.Mock).mockResolvedValue([
      { quizzes: [{ id: "quiz-1" }] },
    ]);
    (mockPrisma.quizAttempt.findMany as jest.Mock).mockResolvedValue([{ quizId: "quiz-1" }]);
    (mockPrisma.certificate.create as jest.Mock).mockResolvedValue({ id: "cert-new" });

    const result = await autoIssueCertificate("user-1", "course-1", "enr-1");
    expect(result).not.toBeNull();
    expect(mockPrisma.certificate.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          userId: "user-1",
          courseId: "course-1",
          enrollmentId: "enr-1",
          status: "ACTIVE",
        }),
      })
    );
  });

  it("issues certificate when there are no module quizzes (course with no quizzes)", async () => {
    (mockPrisma.certificate.findUnique as jest.Mock).mockResolvedValue(null);
    (mockPrisma.courseModule.findMany as jest.Mock).mockResolvedValue([
      { quizzes: [] }, // no quizzes
    ]);
    (mockPrisma.certificate.create as jest.Mock).mockResolvedValue({ id: "cert-no-quiz" });

    const result = await autoIssueCertificate("user-1", "course-1", "enr-1");
    expect(result).not.toBeNull();
  });
});

// =====================================================================
// 5. getCourseOverallProgress
// =====================================================================
describe("getCourseOverallProgress", () => {
  const { getCourseOverallProgress } = require("@/services/lesson-progress.service");

  beforeEach(() => jest.clearAllMocks());

  it("returns 0% when no lessons published", async () => {
    (mockPrisma.lesson.count as jest.Mock).mockResolvedValue(0);
    const result = await getCourseOverallProgress("supabase-uid", "course-1");
    expect(result.progressPercent).toBe(0);
    expect(result.totalLessons).toBe(0);
  });

  it("calculates correct percentage", async () => {
    (mockPrisma.lesson.count as jest.Mock).mockResolvedValue(10);
    (mockPrisma.lessonProgress.count as jest.Mock).mockResolvedValue(7);
    const result = await getCourseOverallProgress("supabase-uid", "course-1");
    expect(result.progressPercent).toBe(70);
    expect(result.completedLessons).toBe(7);
  });
});

// =====================================================================
// 6. enrollment.service — checkAndCompleteEnrollment
// =====================================================================
describe("checkAndCompleteEnrollment", () => {
  const { checkAndCompleteEnrollment } = require("@/services/enrollment.service");

  beforeEach(() => jest.clearAllMocks());

  it("returns null if not all lessons are completed", async () => {
    (mockPrisma.lesson.count as jest.Mock).mockResolvedValue(5);
    (mockPrisma.lessonProgress.count as jest.Mock).mockResolvedValue(3);

    const result = await checkAndCompleteEnrollment("user-1", "course-1");
    expect(result).toBeNull();
    expect(mockPrisma.enrollment.update).not.toHaveBeenCalled();
  });

  it("completes enrollment and triggers autoIssueCertificate when all lessons complete", async () => {
    (mockPrisma.lesson.count as jest.Mock).mockResolvedValue(5);
    (mockPrisma.lessonProgress.count as jest.Mock).mockResolvedValue(5);
    (mockPrisma.enrollment.findUnique as jest.Mock).mockResolvedValue({
      id: "enr-1",
      status: "ACTIVE",
    });
    (mockPrisma.enrollment.update as jest.Mock).mockResolvedValue({
      id: "enr-1",
      status: "COMPLETED",
    });
    (mockPrisma.certificate.findUnique as jest.Mock).mockResolvedValue(null);
    (mockPrisma.courseModule.findMany as jest.Mock).mockResolvedValue([{ quizzes: [] }]);
    (mockPrisma.certificate.create as jest.Mock).mockResolvedValue({ id: "cert-1" });

    const result = await checkAndCompleteEnrollment("user-1", "course-1");
    expect(result?.status).toBe("COMPLETED");
    expect(mockPrisma.enrollment.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "enr-1" },
        data: expect.objectContaining({ status: "COMPLETED" }),
      })
    );
  });
});

// =====================================================================
// 7. module-progress.service — getModuleProgress
// =====================================================================
describe("getModuleProgress", () => {
  const { getModuleProgress } = require("@/services/module-progress.service");

  beforeEach(() => jest.clearAllMocks());

  it("fetches courseModuleProgress for user and module", async () => {
    const mockProgress = { userId: "user-1", moduleId: "mod-1", isCompleted: true };
    (mockPrisma.courseModuleProgress.findUnique as jest.Mock).mockResolvedValue(mockProgress);

    const result = await getModuleProgress("user-1", "mod-1");
    expect(result).toEqual(mockProgress);
    expect(mockPrisma.courseModuleProgress.findUnique).toHaveBeenCalledWith({
      where: { userId_moduleId: { userId: "user-1", moduleId: "mod-1" } },
    });
  });
});
