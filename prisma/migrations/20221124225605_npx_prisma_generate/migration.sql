/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `forget_password` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `forget_password` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- CreateIndex
CREATE UNIQUE INDEX `id_UNIQUE` ON `forget_password`(`id`);
