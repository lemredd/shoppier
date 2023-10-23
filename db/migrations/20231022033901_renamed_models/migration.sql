/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CartProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Address";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Cart";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CartProduct";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Product";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Addresses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "street" TEXT NOT NULL,
    "suite" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT NOT NULL,
    "auth_token" TEXT NOT NULL,
    "phone" TEXT
);

-- CreateTable
CREATE TABLE "Carts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CartItems" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,
    CONSTRAINT "CartItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CartItems_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Carts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Products" (
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

-- CreateIndex
CREATE UNIQUE INDEX "Addresses_user_id_key" ON "Addresses"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_auth_token_key" ON "Users"("auth_token");

-- CreateIndex
CREATE UNIQUE INDEX "Carts_user_id_key" ON "Carts"("user_id");
