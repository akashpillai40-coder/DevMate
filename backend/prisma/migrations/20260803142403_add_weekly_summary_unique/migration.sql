/*
  Warnings:

  - A unique constraint covering the columns `[userId,weekStart]` on the table `WeeklySummary` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WeeklySummary_userId_weekStart_key" ON "WeeklySummary"("userId", "weekStart");
