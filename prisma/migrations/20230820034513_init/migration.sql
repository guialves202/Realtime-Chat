/*
  Warnings:

  - You are about to drop the `messagewordrecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `messagewordrecord` DROP FOREIGN KEY `MessageWordRecord_messageId_fkey`;

-- DropForeignKey
ALTER TABLE `messagewordrecord` DROP FOREIGN KEY `MessageWordRecord_wordId_fkey`;

-- DropTable
DROP TABLE `messagewordrecord`;

-- CreateTable
CREATE TABLE `messageWordRecords` (
    `id` VARCHAR(191) NOT NULL,
    `messageId` VARCHAR(191) NOT NULL,
    `wordId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `messageWordRecords` ADD CONSTRAINT `messageWordRecords_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `messageRecords`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messageWordRecords` ADD CONSTRAINT `messageWordRecords_wordId_fkey` FOREIGN KEY (`wordId`) REFERENCES `forbiddenWords`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
