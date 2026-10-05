-- AlterTable
ALTER TABLE "Certificate" ADD COLUMN     "enrollmentId" TEXT;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "moduleId" TEXT,
ALTER COLUMN "lessonId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "QuizAttempt" ADD COLUMN     "enrollmentId" TEXT;

-- CreateTable
CREATE TABLE "CourseModuleProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseModuleProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CourseModuleProgress_enrollmentId_idx" ON "CourseModuleProgress"("enrollmentId");

-- CreateIndex
CREATE INDEX "CourseModuleProgress_userId_idx" ON "CourseModuleProgress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseModuleProgress_userId_moduleId_key" ON "CourseModuleProgress"("userId", "moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_enrollmentId_key" ON "Certificate"("enrollmentId");

-- CreateIndex
CREATE INDEX "Quiz_moduleId_idx" ON "Quiz"("moduleId");

-- CreateIndex
CREATE INDEX "QuizAttempt_enrollmentId_idx" ON "QuizAttempt"("enrollmentId");

-- CreateIndex
CREATE INDEX "User_supabaseUserId_idx" ON "User"("supabaseUserId");

-- AddForeignKey
ALTER TABLE "CourseModuleProgress" ADD CONSTRAINT "CourseModuleProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseModuleProgress" ADD CONSTRAINT "CourseModuleProgress_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "CourseModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseModuleProgress" ADD CONSTRAINT "CourseModuleProgress_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "CourseModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
