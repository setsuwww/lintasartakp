/*
  Warnings:

  - You are about to drop the column `endDate` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `schedule` DROP COLUMN `endDate`,
    DROP COLUMN `startDate`;

-- CreateTable
CREATE TABLE `ScheduleDate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `shiftId` INTEGER NOT NULL,
    `scheduleId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ScheduleDate` ADD CONSTRAINT `ScheduleDate_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `Schedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
