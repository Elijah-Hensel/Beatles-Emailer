/*
  Warnings:

  - You are about to drop the `UsersOnMessages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UsersOnMessages";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_MessageToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_MessageToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Message" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MessageToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_MessageToUser_AB_unique" ON "_MessageToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MessageToUser_B_index" ON "_MessageToUser"("B");
