/*
  Warnings:

  - You are about to drop the `_MessageToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_MessageToUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UsersOnMessages" (
    "userId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userId", "messageId"),
    CONSTRAINT "UsersOnMessages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersOnMessages_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
