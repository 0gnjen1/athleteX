-- AlterTable
ALTER TABLE `Admin` MODIFY `email` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `Coach` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Coach_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Athlete` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `coach_id` INTEGER NULL,

    UNIQUE INDEX `Athlete_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Athlete` ADD CONSTRAINT `Athlete_coach_id_fkey` FOREIGN KEY (`coach_id`) REFERENCES `Coach`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
