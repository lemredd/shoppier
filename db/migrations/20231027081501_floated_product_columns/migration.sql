/*
  Warnings:

  - You are about to alter the column `discount_percentage` on the `Products` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `price` on the `Products` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `rating` on the `Products` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "discount_percentage" REAL,
    "rating" REAL,
    "category" TEXT,
    "thumbnail" TEXT,
    "images" TEXT
);
INSERT INTO "new_Products" ("brand", "category", "description", "discount_percentage", "id", "images", "price", "rating", "stock", "thumbnail", "title") SELECT "brand", "category", "description", "discount_percentage", "id", "images", "price", "rating", "stock", "thumbnail", "title" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
