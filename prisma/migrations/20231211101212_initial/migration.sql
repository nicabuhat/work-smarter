-- CreateTable
CREATE TABLE `Pricing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `region` VARCHAR(191) NOT NULL,
    `country_name` VARCHAR(191) NOT NULL,
    `country_code` VARCHAR(191) NOT NULL,
    `format` VARCHAR(191) NOT NULL,
    `contextual_plus` VARCHAR(191) NOT NULL,
    `publisher_1pd` VARCHAR(191) NOT NULL,
    `local_publisher_1pd` VARCHAR(191) NOT NULL DEFAULT '*On request',
    `search_intent` VARCHAR(191) NOT NULL,
    `data_provider_segments` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
