-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_feedbackCycleId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_teamId_fkey";

-- AlterTable
ALTER TABLE "Feedback" ALTER COLUMN "teamId" DROP NOT NULL,
ALTER COLUMN "feedbackCycleId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_feedbackCycleId_fkey" FOREIGN KEY ("feedbackCycleId") REFERENCES "FeedbackCycle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
