/*
  Warnings:

  - You are about to drop the `scheduleassignment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `scheduleassignment` DROP FOREIGN KEY `ScheduleAssignment_scheduleId_fkey`;

-- DropForeignKey
ALTER TABLE `scheduleassignment` DROP FOREIGN KEY `ScheduleAssignment_userId_fkey`;

-- DropTable
DROP TABLE `scheduleassignment`;
