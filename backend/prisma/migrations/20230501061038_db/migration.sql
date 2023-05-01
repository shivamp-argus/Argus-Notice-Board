/*
  Warnings:

  - Added the required column `createdBy` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addedBy` to the `Employee_Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addedBy` to the `Notice_Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Category` ADD COLUMN `createdBy` VARCHAR(191) NOT NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `Employee_Team` ADD COLUMN `addedBy` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Notice_Team` ADD COLUMN `addedBy` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
