/*
  Warnings:

  - You are about to drop the `Employee_Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notices_Group` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Employee_Group` DROP FOREIGN KEY `Employee_Group_emp_id_fkey`;

-- DropForeignKey
ALTER TABLE `Employee_Group` DROP FOREIGN KEY `Employee_Group_group_id_fkey`;

-- DropForeignKey
ALTER TABLE `Notices` DROP FOREIGN KEY `Notices_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `Notices` DROP FOREIGN KEY `Notices_issuer_id_fkey`;

-- DropForeignKey
ALTER TABLE `Notices_Group` DROP FOREIGN KEY `Notices_Group_group_id_fkey`;

-- DropForeignKey
ALTER TABLE `Notices_Group` DROP FOREIGN KEY `Notices_Group_notice_id_fkey`;

-- DropTable
DROP TABLE `Employee_Group`;

-- DropTable
DROP TABLE `Notices`;

-- DropTable
DROP TABLE `Notices_Group`;

-- CreateTable
CREATE TABLE `Notice` (
    `id` VARCHAR(191) NOT NULL,
    `notice_body` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `issuer_id` VARCHAR(191) NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Notice_id_issuer_id_key`(`id`, `issuer_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee_Team` (
    `emp_id` VARCHAR(191) NOT NULL,
    `group_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Employee_Team_emp_id_group_id_key`(`emp_id`, `group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notice_Team` (
    `notice_id` VARCHAR(191) NOT NULL,
    `group_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Notice_Team_notice_id_group_id_key`(`notice_id`, `group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notice` ADD CONSTRAINT `Notice_issuer_id_fkey` FOREIGN KEY (`issuer_id`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notice` ADD CONSTRAINT `Notice_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee_Team` ADD CONSTRAINT `Employee_Team_emp_id_fkey` FOREIGN KEY (`emp_id`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee_Team` ADD CONSTRAINT `Employee_Team_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notice_Team` ADD CONSTRAINT `Notice_Team_notice_id_fkey` FOREIGN KEY (`notice_id`) REFERENCES `Notice`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notice_Team` ADD CONSTRAINT `Notice_Team_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
