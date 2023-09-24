/*
  Warnings:

  - You are about to drop the `wordrecords` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `wordrecords` DROP FOREIGN KEY `wordRecords_userId_fkey`;

-- DropForeignKey
ALTER TABLE `wordrecords` DROP FOREIGN KEY `wordRecords_word_fkey`;

-- DropTable
DROP TABLE `wordrecords`;

-- CreateTable
CREATE TABLE `messageRecords` (
    `id` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MessageWordRecord` (
    `id` VARCHAR(191) NOT NULL,
    `messageId` VARCHAR(191) NOT NULL,
    `wordId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `messageRecords` ADD CONSTRAINT `messageRecords_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MessageWordRecord` ADD CONSTRAINT `MessageWordRecord_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `messageRecords`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MessageWordRecord` ADD CONSTRAINT `MessageWordRecord_wordId_fkey` FOREIGN KEY (`wordId`) REFERENCES `forbiddenWords`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
