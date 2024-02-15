-- CreateTable
CREATE TABLE `Parent Category` (
    `name` VARCHAR(199) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subcategory` (
    `name` VARCHAR(199) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `URL` (
    `url` VARCHAR(199) NOT NULL,
    `country_code` VARCHAR(2) NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subcategory_id` INTEGER NULL,

    INDEX `subcategory_id`(`subcategory_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `URL` ADD CONSTRAINT `subcategory_id` FOREIGN KEY (`subcategory_id`) REFERENCES `Subcategory`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
