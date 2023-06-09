/*
  Warnings:

  - The primary key for the `Employee_Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `emp_grp_id` on the `Employee_Team` table. All the data in the column will be lost.
  - Added the required column `id` to the `Employee_Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Employee_Team` DROP PRIMARY KEY,
    DROP COLUMN `emp_grp_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
