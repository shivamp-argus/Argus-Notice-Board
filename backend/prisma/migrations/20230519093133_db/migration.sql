/*
  Warnings:

  - You are about to alter the column `role` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Employee` MODIFY `role` ENUM('SUPERADMIN', 'EMPLOYEE', 'HR', 'VP', 'CEO') NOT NULL DEFAULT 'EMPLOYEE';
