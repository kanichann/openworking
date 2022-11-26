/*
  Warnings:

  - The primary key for the `forget_password` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `forget_password` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `forget_password` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `forget_password` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `forget_password` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `forget_password` DROP FOREIGN KEY `forget_password_userEmail_fkey`;

-- DropIndex
DROP INDEX `id_UNIQUE` ON `forget_password`;

-- AlterTable
ALTER TABLE `forget_password` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `userEmail`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`email`);

-- CreateIndex
CREATE UNIQUE INDEX `email_UNIQUE` ON `forget_password`(`email`);
