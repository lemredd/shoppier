/*
  Warnings:

  - You are about to drop the column `auth_token` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `cartId` on the `CartItems` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `CartItems` table. All the data in the column will be lost.
  - You are about to drop the column `discountPercentage` on the `Products` table. All the data in the column will be lost.
  - Added the required column `cart_id` to the `CartItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `CartItems` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "AuthTokens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    CONSTRAINT "AuthTokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT NOT NULL,
    "phone" TEXT
);
INSERT INTO "new_Users" ("email", "id", "name", "password", "phone", "username") SELECT "email", "id", "name", "password", "phone", "username" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
CREATE TABLE "new_CartItems" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "cart_id" INTEGER NOT NULL,
    CONSTRAINT "CartItems_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CartItems_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "Carts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CartItems" ("id", "quantity") SELECT "id", "quantity" FROM "CartItems";
DROP TABLE "CartItems";
ALTER TABLE "new_CartItems" RENAME TO "CartItems";
CREATE TABLE "new_Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "discount_percentage" INTEGER,
    "rating" INTEGER,
    "category" TEXT,
    "thumbnail" TEXT,
    "images" TEXT
);
INSERT INTO "new_Products" ("brand", "category", "description", "id", "images", "price", "rating", "stock", "thumbnail", "title") SELECT "brand", "category", "description", "id", "images", "price", "rating", "stock", "thumbnail", "title" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "AuthTokens_user_id_key" ON "AuthTokens"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "AuthTokens_value_key" ON "AuthTokens"("value");
