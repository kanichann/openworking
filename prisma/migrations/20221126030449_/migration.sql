/*
  Warnings:

  - You are about to drop the `forget_password` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `token` VARCHAR(100) NULL,
    ADD COLUMN `tokenExpired` INTEGER NULL;

-- DropTable
DROP TABLE `forget_password`;
