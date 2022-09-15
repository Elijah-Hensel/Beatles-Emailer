/*
  Warnings:

  - You are about to drop the column `user_id` on the `Message` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_MessageToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_MessageToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Message" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MessageToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "message" TEXT NOT NULL
);
INSERT INTO "new_Message" ("id", "message") SELECT "id", "message" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_MessageToUser_AB_unique" ON "_MessageToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MessageToUser_B_index" ON "_MessageToUser"("B");
