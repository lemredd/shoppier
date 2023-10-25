-- CreateTable
CREATE TABLE "Orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address_id" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,
    "subtotal" REAL NOT NULL,
    "shipping_fee" REAL NOT NULL,
    "arrival" DATETIME NOT NULL,
    CONSTRAINT "Orders_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Addresses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Orders_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "OrderStatuses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderStatuses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "details" TEXT NOT NULL
);
