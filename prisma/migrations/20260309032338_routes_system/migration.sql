/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Route` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[routeId,number]` on the table `Stage` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "JournalEntry" DROP CONSTRAINT "JournalEntry_stageId_fkey";

-- AlterTable
ALTER TABLE "JournalEntry" ALTER COLUMN "stageId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "country" TEXT,
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Stage" ADD COLUMN     "lat" DOUBLE PRECISION,
ADD COLUMN     "lng" DOUBLE PRECISION;

-- CreateIndex
CREATE INDEX "JournalEntry_stageId_idx" ON "JournalEntry"("stageId");

-- CreateIndex
CREATE INDEX "JournalEntry_userId_createdAt_idx" ON "JournalEntry"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Route_slug_key" ON "Route"("slug");

-- CreateIndex
CREATE INDEX "Route_slug_idx" ON "Route"("slug");

-- CreateIndex
CREATE INDEX "Stage_routeId_idx" ON "Stage"("routeId");

-- CreateIndex
CREATE UNIQUE INDEX "Stage_routeId_number_key" ON "Stage"("routeId", "number");

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
