/*
  Warnings:

  - Added the required column `auth_token` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT NOT NULL,
    "auth_token" TEXT NOT NULL,
    "phone" TEXT
);
INSERT INTO "new_User" ("email", "id", "name", "password", "phone", "username") SELECT "email", "id", "name", "password", "phone", "username" FROM "User";
UPDATE "new_User" SET "auth_token" = email || strftime('_%s', 'now');
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_auth_token_key" ON "User"("auth_token");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
