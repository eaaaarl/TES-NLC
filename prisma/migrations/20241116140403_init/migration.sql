-- CreateTable
CREATE TABLE `RegistrationToken` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `used` BOOLEAN NOT NULL DEFAULT false,
    `role` ENUM('ADMINISTRATOR', 'FACULTY', 'STUDENT') NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RegistrationToken_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `studentID` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `Role` ENUM('ADMINISTRATOR', 'FACULTY', 'STUDENT') NOT NULL DEFAULT 'STUDENT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_studentID_key`(`studentID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Administrator` (
    `id` VARCHAR(191) NOT NULL,
    `avatarUrl` VARCHAR(191) NULL,
    `adminID` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Administrator_adminID_key`(`adminID`),
    UNIQUE INDEX `Administrator_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `id` VARCHAR(191) NOT NULL,
    `studentID` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `middlename` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NOT NULL,
    `contact_no` VARCHAR(191) NULL,
    `status` ENUM('PENDING', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `avatarUrl` VARCHAR(191) NULL,
    `birthdate` VARCHAR(191) NULL,
    `streetAddress` VARCHAR(191) NOT NULL,
    `barangay` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state_province` VARCHAR(191) NOT NULL,
    `postal_code` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `courseID` VARCHAR(191) NOT NULL,
    `sectionId` VARCHAR(191) NOT NULL,
    `yearLevelId` VARCHAR(191) NOT NULL,
    `departmentId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Student_studentID_key`(`studentID`),
    UNIQUE INDEX `Student_email_key`(`email`),
    UNIQUE INDEX `Student_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `id` VARCHAR(191) NOT NULL,
    `courseName` VARCHAR(191) NOT NULL,
    `departmentId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `yearLevelId` VARCHAR(191) NOT NULL,
    `departmentId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Section` (
    `id` VARCHAR(191) NOT NULL,
    `sectionName` VARCHAR(191) NOT NULL,
    `yearLevelId` VARCHAR(191) NOT NULL,
    `departmentId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Section_sectionName_key`(`sectionName`),
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

-- CreateTable
CREATE TABLE `StudentSubjectAssign` (
    `id` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `subjectId` VARCHAR(191) NOT NULL,
    `academicYearId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `StudentSubjectAssign_studentId_subjectId_academicYearId_key`(`studentId`, `subjectId`, `academicYearId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evaluation` (
    `id` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `subjectId` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,
    `responses` JSON NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `deadline` DATETIME(3) NOT NULL,
    `academicYearId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Evaluation_studentId_subjectId_facultyId_academicYearId_key`(`studentId`, `subjectId`, `facultyId`, `academicYearId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Faculty` (
    `id` VARCHAR(191) NOT NULL,
    `avatarUrl` VARCHAR(191) NULL,
    `facultyID` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `middlename` VARCHAR(191) NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `profileVisibility` BOOLEAN NOT NULL DEFAULT true,
    `phoneNumber` VARCHAR(191) NULL,
    `position` VARCHAR(191) NULL,
    `departmentId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Faculty_facultyID_key`(`facultyID`),
    UNIQUE INDEX `Faculty_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FacultySubjectAssign` (
    `id` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,
    `subjectId` VARCHAR(191) NOT NULL,
    `academicYearId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `FacultySubjectAssign_facultyId_subjectId_academicYearId_key`(`facultyId`, `subjectId`, `academicYearId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FacultyEvaluation` (
    `id` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,
    `academicYearId` VARCHAR(191) NOT NULL,
    `categoryRatings` JSON NOT NULL,
    `overallRating` DOUBLE NOT NULL,
    `totalEvaluations` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `FacultyEvaluation_facultyId_academicYearId_key`(`facultyId`, `academicYearId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Administrator` ADD CONSTRAINT `Administrator_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_courseID_fkey` FOREIGN KEY (`courseID`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `Section`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_yearLevelId_fkey` FOREIGN KEY (`yearLevelId`) REFERENCES `YearLevel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_yearLevelId_fkey` FOREIGN KEY (`yearLevelId`) REFERENCES `YearLevel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Section` ADD CONSTRAINT `Section_yearLevelId_fkey` FOREIGN KEY (`yearLevelId`) REFERENCES `YearLevel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Section` ADD CONSTRAINT `Section_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `questions` ADD CONSTRAINT `questions_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rating_scales` ADD CONSTRAINT `rating_scales_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentSubjectAssign` ADD CONSTRAINT `StudentSubjectAssign_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentSubjectAssign` ADD CONSTRAINT `StudentSubjectAssign_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentSubjectAssign` ADD CONSTRAINT `StudentSubjectAssign_academicYearId_fkey` FOREIGN KEY (`academicYearId`) REFERENCES `AcademicYear`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation` ADD CONSTRAINT `Evaluation_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation` ADD CONSTRAINT `Evaluation_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation` ADD CONSTRAINT `Evaluation_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation` ADD CONSTRAINT `Evaluation_academicYearId_fkey` FOREIGN KEY (`academicYearId`) REFERENCES `AcademicYear`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Faculty` ADD CONSTRAINT `Faculty_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Faculty` ADD CONSTRAINT `Faculty_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FacultySubjectAssign` ADD CONSTRAINT `FacultySubjectAssign_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FacultySubjectAssign` ADD CONSTRAINT `FacultySubjectAssign_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FacultySubjectAssign` ADD CONSTRAINT `FacultySubjectAssign_academicYearId_fkey` FOREIGN KEY (`academicYearId`) REFERENCES `AcademicYear`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FacultyEvaluation` ADD CONSTRAINT `FacultyEvaluation_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FacultyEvaluation` ADD CONSTRAINT `FacultyEvaluation_academicYearId_fkey` FOREIGN KEY (`academicYearId`) REFERENCES `AcademicYear`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
