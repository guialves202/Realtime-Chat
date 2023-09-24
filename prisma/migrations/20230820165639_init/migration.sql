/*
  Warnings:

  - You are about to drop the column `userId` on the `message_records` table. All the data in the column will be lost.
  - Added the required column `username` to the `message_records` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `message_records` DROP FOREIGN KEY `message_records_userId_fkey`;

-- AlterTable
ALTER TABLE `message_records` DROP COLUMN `userId`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;
