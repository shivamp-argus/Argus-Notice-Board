-- CreateTable
CREATE TABLE `Employee` (
    `emp_id` INTEGER NOT NULL AUTO_INCREMENT,
    `emp_name` VARCHAR(191) NOT NULL,
    `emp_email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `role` ENUM('Employee', 'HR', 'VP', 'CEO') NOT NULL DEFAULT 'Employee',

    UNIQUE INDEX `Employee_emp_email_key`(`emp_email`),
    PRIMARY KEY (`emp_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notices` (
    `notice_id` INTEGER NOT NULL AUTO_INCREMENT,
    `notice_body` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `issuer_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,

    UNIQUE INDEX `Notices_notice_id_issuer_id_key`(`notice_id`, `issuer_id`),
    PRIMARY KEY (`notice_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_category_key`(`category`),
    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Group` (
    `group_id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Group_group_name_key`(`group_name`),
    PRIMARY KEY (`group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee_Group` (
    `emp_id` INTEGER NOT NULL,
    `group_id` INTEGER NOT NULL,

    UNIQUE INDEX `Employee_Group_emp_id_group_id_key`(`emp_id`, `group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notices_Group` (
    `notice_id` INTEGER NOT NULL,
    `group_id` INTEGER NOT NULL,

    UNIQUE INDEX `Notices_Group_notice_id_group_id_key`(`notice_id`, `group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notices` ADD CONSTRAINT `Notices_issuer_id_fkey` FOREIGN KEY (`issuer_id`) REFERENCES `Employee`(`emp_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notices` ADD CONSTRAINT `Notices_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee_Group` ADD CONSTRAINT `Employee_Group_emp_id_fkey` FOREIGN KEY (`emp_id`) REFERENCES `Employee`(`emp_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee_Group` ADD CONSTRAINT `Employee_Group_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `Group`(`group_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notices_Group` ADD CONSTRAINT `Notices_Group_notice_id_fkey` FOREIGN KEY (`notice_id`) REFERENCES `Notices`(`notice_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notices_Group` ADD CONSTRAINT `Notices_Group_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `Group`(`group_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
 