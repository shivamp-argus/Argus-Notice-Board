/*
  Warnings:

  - You are about to drop the `Groups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Employee_Group` DROP FOREIGN KEY `Employee_Group_group_id_fkey`;

-- DropForeignKey
ALTER TABLE `Notices_Group` DROP FOREIGN KEY `Notices_Group_group_id_fkey`;

-- DropTable
DROP TABLE `Groups`;

-- CreateTable
CREATE TABLE `Team` (
    `id` VARCHAR(191) NOT NULL,
    `group_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Team_group_name_key`(`group_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employee_Group` ADD CONSTRAINT `Employee_Group_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notices_Group` ADD CONSTRAINT `Notices_Group_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
