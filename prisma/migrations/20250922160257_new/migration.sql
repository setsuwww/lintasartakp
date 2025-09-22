/*
  Warnings:

  - You are about to drop the `scheduledate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `scheduledate` DROP FOREIGN KEY `ScheduleDate_scheduleId_fkey`;

-- AlterTable
ALTER TABLE `schedule` ADD COLUMN `endDate` DATETIME(3) NULL,
    ADD COLUMN `startDate` DATETIME(3) NULL;

-- DropTable
DROP TABLE `scheduledate`;
