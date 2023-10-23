/*
  Warnings:

  - You are about to drop the column `street` on the `Addresses` table. All the data in the column will be lost.
  - You are about to drop the column `suite` on the `Addresses` table. All the data in the column will be lost.
  - Added the required column `address_1` to the `Addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_2` to the `Addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Addresses` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Addresses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address_1" TEXT NOT NULL,
    "address_2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Addresses" ("city", "country", "id", "user_id", "zipcode") SELECT "city", "country", "id", "user_id", "zipcode" FROM "Addresses";
DROP TABLE "Addresses";
ALTER TABLE "new_Addresses" RENAME TO "Addresses";
CREATE UNIQUE INDEX "Addresses_user_id_key" ON "Addresses"("user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
