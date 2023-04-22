/*
  Warnings:

  - Added the required column `emp_grp_id` to the `Employee_Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Employee_Team` ADD COLUMN `emp_grp_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`emp_grp_id`);
