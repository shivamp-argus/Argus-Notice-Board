-- AlterTable
ALTER TABLE `Employee` MODIFY `role` ENUM('SUPERADMIN', 'Employee', 'HR', 'VP', 'CEO') NOT NULL DEFAULT 'Employee';
