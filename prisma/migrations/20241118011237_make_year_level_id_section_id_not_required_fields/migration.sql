-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_sectionId_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_yearLevelId_fkey`;

-- AlterTable
ALTER TABLE `student` MODIFY `sectionId` VARCHAR(191) NULL,
    MODIFY `yearLevelId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `Section`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_yearLevelId_fkey` FOREIGN KEY (`yearLevelId`) REFERENCES `YearLevel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
