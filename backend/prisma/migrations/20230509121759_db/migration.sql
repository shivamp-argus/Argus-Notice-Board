-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
