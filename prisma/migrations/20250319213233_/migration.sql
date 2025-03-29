/*
  Warnings:

  - You are about to alter the column `heating` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `builtYear` VARCHAR(191) NOT NULL,
    MODIFY `renovationYear` VARCHAR(191) NOT NULL,
    MODIFY `heating` BOOLEAN NOT NULL DEFAULT false;
