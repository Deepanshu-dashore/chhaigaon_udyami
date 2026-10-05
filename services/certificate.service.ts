import prisma from "@/lib/prisma";
import crypto from "crypto";

/**
 * Auto-issue a certificate for a user who completed a course.
 * Checks that all module quizzes (if any) were passed before issuing.
 */
export async function autoIssueCertificate(
  userId: string,
  courseId: string,
  enrollmentId: string
): Promise<{ certificate: object } | null> {
  // Check if certificate already issued for this enrollment
  const existing = await prisma.certificate.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });
  if (existing) return { certificate: existing };

  // Verify all module quizzes (if any) are passed
  const allModulesWithQuizzes = await prisma.courseModule.findMany({
    where: { courseId },
    include: {
      quizzes: { select: { id: true } },
    },
  });

  const quizIds = allModulesWithQuizzes
    .flatMap((m) => m.quizzes)
    .map((q) => q.id);

  if (quizIds.length > 0) {
    // For each quiz, check that the user has at least one passing attempt in this enrollment
    const passedAttempts = await prisma.quizAttempt.findMany({
      where: {
        quizId: { in: quizIds },
        userId,
        enrollmentId,
        isPassed: true,
      },
      select: { quizId: true },
    });

    const passedQuizIds = new Set(passedAttempts.map((a) => a.quizId));
    const allPassed = quizIds.every((id) => passedQuizIds.has(id));

    if (!allPassed) {
      // Not all quizzes passed — cannot issue certificate yet
      return null;
    }
  }

  // Generate unique identifiers
  const certificateNumber = `CERT-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
  const verificationCode = crypto.randomBytes(8).toString("hex").toUpperCase();

  const certificate = await prisma.certificate.create({
    data: {
      userId,
      courseId,
      enrollmentId,
      certificateNumber,
      verificationCode,
      status: "ACTIVE",
    },
  });

  return { certificate };
}

/**
 * Get certificate for a user on a specific course
 */
export async function getCertificate(userId: string, courseId: string) {
  return prisma.certificate.findUnique({
    where: { userId_courseId: { userId, courseId } },
    include: {
      course: { select: { id: true, title: true, slug: true } },
    },
  });
}

/**
 * Verify a certificate by verificationCode (public endpoint)
 */
export async function verifyCertificate(verificationCode: string) {
  return prisma.certificate.findUnique({
    where: { verificationCode },
    include: {
      user: { select: { id: true, name: true } },
      course: { select: { id: true, title: true, slug: true } },
    },
  });
}
