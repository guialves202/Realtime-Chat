/*
  Warnings:

  - You are about to drop the column `wordId` on the `message_word_records` table. All the data in the column will be lost.
  - Added the required column `word` to the `message_word_records` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `message_word_records` DROP FOREIGN KEY `message_word_records_wordId_fkey`;

-- AlterTable
ALTER TABLE `message_word_records` DROP COLUMN `wordId`,
    ADD COLUMN `word` VARCHAR(191) NOT NULL;
