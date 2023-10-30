/*
  Warnings:

  - You are about to drop the column `status_id` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `OrderStatuses` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderStatuses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "order_id" INTEGER NOT NULL,
    CONSTRAINT "OrderStatuses_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderStatuses" ("details", "id", "type") SELECT "details", "id", "type" FROM "OrderStatuses";
DROP TABLE "OrderStatuses";
ALTER TABLE "new_OrderStatuses" RENAME TO "OrderStatuses";
CREATE TABLE "new_Orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "subtotal" REAL NOT NULL,
    "shipping_fee" REAL NOT NULL,
    "arrival" DATETIME NOT NULL,
    CONSTRAINT "Orders_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Addresses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Orders" ("address_id", "arrival", "id", "shipping_fee", "subtotal", "user_id") SELECT "address_id", "arrival", "id", "shipping_fee", "subtotal", "user_id" FROM "Orders";
DROP TABLE "Orders";
ALTER TABLE "new_Orders" RENAME TO "Orders";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
