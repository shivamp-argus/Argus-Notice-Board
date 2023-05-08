/*
  Warnings:

  - Added the required column `notice_title` to the `Notice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Notice` ADD COLUMN `notice_title` VARCHAR(191) NOT NULL;
