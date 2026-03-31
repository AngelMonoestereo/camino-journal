/*
  Warnings:

  - You are about to drop the column `country` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `Stage` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `Stage` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Route_slug_idx";

-- DropIndex
DROP INDEX "Route_slug_key";

-- DropIndex
DROP INDEX "Stage_routeId_idx";

-- AlterTable
ALTER TABLE "Route" DROP COLUMN "country",
DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Stage" DROP COLUMN "lat",
DROP COLUMN "lng";

-- CreateTable
CREATE TABLE "UserStageProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stageId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT true,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserStageProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserStageProgress_userId_stageId_key" ON "UserStageProgress"("userId", "stageId");

-- AddForeignKey
ALTER TABLE "UserStageProgress" ADD CONSTRAINT "UserStageProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStageProgress" ADD CONSTRAINT "UserStageProgress_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
