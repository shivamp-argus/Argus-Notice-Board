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

-- AddForeignKey
ALTER TABLE `Notices` ADD CONSTRAINT `Notices_issuer_id_fkey` FOREIGN KEY (`issuer_id`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notices` ADD CONSTRAINT `Notices_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee_Group` ADD CONSTRAINT `Employee_Group_emp_id_fkey` FOREIGN KEY (`emp_id`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee_Group` ADD CONSTRAINT `Employee_Group_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `Group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notices_Group` ADD CONSTRAINT `Notices_Group_notice_id_fkey` FOREIGN KEY (`notice_id`) REFERENCES `Notices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notices_Group` ADD CONSTRAINT `Notices_Group_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `Group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
