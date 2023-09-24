/*
  Warnings:

  - You are about to drop the `forbiddenwords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `messagerecords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `messagewordrecords` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `messagerecords` DROP FOREIGN KEY `messageRecords_userId_fkey`;

-- DropForeignKey
ALTER TABLE `messagewordrecords` DROP FOREIGN KEY `messageWordRecords_messageId_fkey`;

-- DropForeignKey
ALTER TABLE `messagewordrecords` DROP FOREIGN KEY `messageWordRecords_wordId_fkey`;

-- DropTable
DROP TABLE `forbiddenwords`;

-- DropTable
DROP TABLE `messagerecords`;

-- DropTable
DROP TABLE `messagewordrecords`;

-- CreateTable
CREATE TABLE `forbidden_words` (
    `id` VARCHAR(191) NOT NULL,
    `word` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `message_records` (
    `id` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `message_word_records` (
    `id` VARCHAR(191) NOT NULL,
    `messageId` VARCHAR(191) NOT NULL,
    `wordId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `message_records` ADD CONSTRAINT `message_records_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message_word_records` ADD CONSTRAINT `message_word_records_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `message_records`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message_word_records` ADD CONSTRAINT `message_word_records_wordId_fkey` FOREIGN KEY (`wordId`) REFERENCES `forbidden_words`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
