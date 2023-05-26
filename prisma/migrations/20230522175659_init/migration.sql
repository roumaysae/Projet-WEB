-- AlterTable
ALTER TABLE `article` MODIFY `image` VARCHAR(191) NULL,
    MODIFY `published` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `ArticleCategory` (
    `articleId` INTEGER NOT NULL,
    `categorieId` INTEGER NOT NULL,

    PRIMARY KEY (`articleId`, `categorieId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ArticleCategory` ADD CONSTRAINT `ArticleCategory_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArticleCategory` ADD CONSTRAINT `ArticleCategory_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `Categorie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
