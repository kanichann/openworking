/*
  Warnings:

  - You are about to drop the column `avatorImage` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `uid_UNIQUE` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `avatorImage`,
    DROP COLUMN `uid`,
    ADD COLUMN `imageId` VARCHAR(45) NOT NULL,
    ADD COLUMN `imageUrl` TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `uid_UNIQUE` ON `user`(`imageId`);
