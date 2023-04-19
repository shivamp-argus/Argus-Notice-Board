/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category_id` on the `Category` table. All the data in the column will be lost.
  - The primary key for the `Employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `emp_id` on the `Employee` table. All the data in the column will be lost.
  - The primary key for the `Group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `group_id` on the `Group` table. All the data in the column will be lost.
  - The primary key for the `Notices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `notice_id` on the `Notices` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,issuer_id]` on the table `Notices` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Category` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Employee` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Group` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Notices` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

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

-- DropIndex
DROP INDEX `Notices_notice_id_issuer_id_key` ON `Notices`;

-- AlterTable
ALTER TABLE `Category` DROP PRIMARY KEY,
    DROP COLUMN `category_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Employee` DROP PRIMARY KEY,
    DROP COLUMN `emp_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Employee_Group` MODIFY `emp_id` VARCHAR(191) NOT NULL,
    MODIFY `group_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Group` DROP PRIMARY KEY,
    DROP COLUMN `group_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Notices` DROP PRIMARY KEY,
    DROP COLUMN `notice_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    MODIFY `issuer_id` VARCHAR(191) NOT NULL,
    MODIFY `category_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Notices_Group` MODIFY `notice_id` VARCHAR(191) NOT NULL,
    MODIFY `group_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Notices_id_issuer_id_key` ON `Notices`(`id`, `issuer_id`);

-- AddForeignKey
ALTER TABLE `Notices` ADD CONSTRAINT `Notices_issuer_id_fkey` FOREIGN KEY (`issuer_id`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notices` ADD CONSTRAINT `Notices_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee_Group` ADD CONSTRAINT `Employee_Group_emp_id_fkey` FOREIGN KEY (`emp_id`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee_Group` ADD CONSTRAINT `Employee_Group_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `Group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notices_Group` ADD CONSTRAINT `Notices_Group_notice_id_fkey` FOREIGN KEY (`notice_id`) REFERENCES `Notices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notices_Group` ADD CONSTRAINT `Notices_Group_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `Group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
