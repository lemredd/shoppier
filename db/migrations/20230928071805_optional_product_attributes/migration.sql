-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "discountPercentage" INTEGER,
    "rating" INTEGER,
    "category" TEXT,
    "thumbnail" TEXT,
    "images" TEXT
);
INSERT INTO "new_Product" ("brand", "category", "description", "discountPercentage", "id", "images", "price", "rating", "stock", "thumbnail", "title") SELECT "brand", "category", "description", "discountPercentage", "id", "images", "price", "rating", "stock", "thumbnail", "title" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
