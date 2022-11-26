/*
  Warnings:

  - Added the required column `token` to the `forget_password` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenExpired` to the `forget_password` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `forget_password` ADD COLUMN `token` VARCHAR(100) NOT NULL,
    ADD COLUMN `tokenExpired` INTEGER NOT NULL;
