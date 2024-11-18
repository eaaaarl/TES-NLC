/*
  Warnings:

  - Made the column `status` on table `academicyear` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `studentsubjectassign` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `academicyear` MODIFY `status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `studentsubjectassign` MODIFY `status` VARCHAR(191) NOT NULL;
