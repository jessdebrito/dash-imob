/*
  Warnings:

  - You are about to drop the column `forRentId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `ForRent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `adtypeId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ForRent` DROP FOREIGN KEY `ForRent_billboardId_fkey`;

-- DropForeignKey
ALTER TABLE `ForRent` DROP FOREIGN KEY `ForRent_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_forRentId_fkey`;

-- DropIndex
DROP INDEX `Product_forRentId_fkey` ON `Product`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `forRentId`,
    ADD COLUMN `adtypeId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `ForRent`;

-- CreateTable
CREATE TABLE `Adtype` (
    `id` VARCHAR(191) NOT NULL,
    `storeId` VARCHAR(191) NOT NULL,
    `billboardId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Adtype_storeId_idx`(`storeId`),
    INDEX `Adtype_billboardId_idx`(`billboardId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Adtype` ADD CONSTRAINT `Adtype_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adtype` ADD CONSTRAINT `Adtype_billboardId_fkey` FOREIGN KEY (`billboardId`) REFERENCES `Billboard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_adtypeId_fkey` FOREIGN KEY (`adtypeId`) REFERENCES `Adtype`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
