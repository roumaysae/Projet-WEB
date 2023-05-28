/*
  Warnings:

  - Made the column `contenue` on table `article` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `article` MODIFY `contenue` TEXT NOT NULL;
