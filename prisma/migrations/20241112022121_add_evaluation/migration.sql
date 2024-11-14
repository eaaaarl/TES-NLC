/*
  Warnings:

  - You are about to drop the column `facultyId` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `section` table. All the data in the column will be lost.
  - You are about to drop the column `fullname` on the `student` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `student` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to drop the column `avatarUrl` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `Role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.
  - You are about to drop the `evaluation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sectionName]` on the table `Section` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentID]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `departmentId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentId` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearLevelId` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barangay` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseID` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state_province` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetAddress` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearlevel` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Made the column `sectionId` on table `student` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `administrator` DROP FOREIGN KEY `Administrator_userId_fkey`;

-- DropForeignKey
ALTER TABLE `course` DROP FOREIGN KEY `Course_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `evaluation` DROP FOREIGN KEY `Evaluation_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `evaluation` DROP FOREIGN KEY `Evaluation_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `evaluation` DROP FOREIGN KEY `Evaluation_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `section` DROP FOREIGN KEY `Section_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_sectionId_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_userId_fkey`;

-- AlterTable
ALTER TABLE `administrator` ADD COLUMN `avatarUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `course` DROP COLUMN `facultyId`,
    ADD COLUMN `departmentId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `faculty` ADD COLUMN `avatarUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `section` DROP COLUMN `courseId`,
    ADD COLUMN `departmentId` VARCHAR(191) NOT NULL,
    ADD COLUMN `yearLevelId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `fullname`,
    ADD COLUMN `avatarUrl` VARCHAR(191) NULL,
    ADD COLUMN `barangay` VARCHAR(191) NOT NULL,
    ADD COLUMN `birthdate` VARCHAR(191) NULL,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `contact_no` VARCHAR(191) NULL,
    ADD COLUMN `courseID` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `departmentId` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `firstname` VARCHAR(191) NOT NULL,
    ADD COLUMN `gender` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastname` VARCHAR(191) NOT NULL,
    ADD COLUMN `middlename` VARCHAR(191) NULL,
    ADD COLUMN `postal_code` VARCHAR(191) NOT NULL,
    ADD COLUMN `state_province` VARCHAR(191) NOT NULL,
    ADD COLUMN `streetAddress` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `yearlevel` VARCHAR(191) NOT NULL,
    MODIFY `status` ENUM('PENDING', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    MODIFY `sectionId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `avatarUrl`,
    DROP COLUMN `passwordHash`,
    DROP COLUMN `username`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `studentID` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `Role` ENUM('ADMINISTRATOR', 'FACULTY', 'STUDENT') NOT NULL DEFAULT 'STUDENT';

-- DropTable
DROP TABLE `evaluation`;

-- CreateTable
CREATE TABLE `Department` (
    `id` VARCHAR(191) NOT NULL,
    `departmentName` VARCHAR(191) NOT NULL,
    `departmentDescription` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subject` (
    `id` VARCHAR(191) NOT NULL,
    `subject_code` VARCHAR(191) NULL,
    `subjectName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `YearLevel` (
    `id` VARCHAR(191) NOT NULL,
    `yearName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AcademicYear` (
    `id` VARCHAR(191) NOT NULL,
    `semester` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `categories_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `questions` (
    `id` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `required` BOOLEAN NOT NULL DEFAULT true,
    `allowComments` BOOLEAN NOT NULL DEFAULT false,
    `categoryId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rating_scales` (
    `id` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `questionId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `rating_scales_questionId_rating_key`(`questionId`, `rating`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Section_sectionName_key` ON `Section`(`sectionName`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_email_key` ON `Student`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `User_studentID_key` ON `User`(`studentID`);

-- AddForeignKey
ALTER TABLE `Administrator` ADD CONSTRAINT `Administrator_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_courseID_fkey` FOREIGN KEY (`courseID`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `Section`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Section` ADD CONSTRAINT `Section_yearLevelId_fkey` FOREIGN KEY (`yearLevelId`) REFERENCES `YearLevel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Section` ADD CONSTRAINT `Section_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `questions` ADD CONSTRAINT `questions_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rating_scales` ADD CONSTRAINT `rating_scales_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
