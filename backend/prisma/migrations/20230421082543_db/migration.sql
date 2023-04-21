-- CreateTable
CREATE TABLE `Employee` (
    `id` VARCHAR(191) NOT NULL,
    `emp_name` VARCHAR(191) NOT NULL,
    `emp_email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `role` ENUM('Employee', 'HR', 'VP', 'CEO') NOT NULL DEFAULT 'Employee',

    UNIQUE INDEX `Employee_emp_email_key`(`emp_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notice` (
    `id` VARCHAR(191) NOT NULL,
    `notice_body` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `issuer_id` VARCHAR(191) NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Notice_id_issuer_id_key`(`id`, `issuer_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_category_key`(`category`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `id` VARCHAR(191) NOT NULL,
    `team_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Team_team_name_key`(`team_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee_Team` (
    `emp_id` VARCHAR(191) NOT NULL,
    `team_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Employee_Team_emp_id_team_id_key`(`emp_id`, `team_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notice_Team` (
    `id` VARCHAR(191) NOT NULL,
    `notice_id` VARCHAR(191) NOT NULL,
    `team_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Notice_Team_notice_id_team_id_key`(`notice_id`, `team_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notice` ADD CONSTRAINT `Notice_issuer_id_fkey` FOREIGN KEY (`issuer_id`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notice` ADD CONSTRAINT `Notice_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee_Team` ADD CONSTRAINT `Employee_Team_emp_id_fkey` FOREIGN KEY (`emp_id`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee_Team` ADD CONSTRAINT `Employee_Team_team_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notice_Team` ADD CONSTRAINT `Notice_Team_notice_id_fkey` FOREIGN KEY (`notice_id`) REFERENCES `Notice`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notice_Team` ADD CONSTRAINT `Notice_Team_team_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
