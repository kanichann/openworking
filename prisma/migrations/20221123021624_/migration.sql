-- CreateTable
CREATE TABLE `forget_password` (
    `id` INTEGER NOT NULL,
    `userEmail` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `forget_password` ADD CONSTRAINT `forget_password_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `user`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
