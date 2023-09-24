/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `active_users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `active_users_userId_key` ON `active_users`(`userId`);
