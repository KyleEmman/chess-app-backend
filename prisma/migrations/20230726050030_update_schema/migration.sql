/*
  Warnings:

  - You are about to drop the column `byId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `byId` on the `Preparation` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Preparation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_byId_fkey";

-- DropForeignKey
ALTER TABLE "Preparation" DROP CONSTRAINT "Preparation_byId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "byId",
ADD COLUMN     "review" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Preparation" DROP COLUMN "byId",
ADD COLUMN     "review" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preparation" ADD CONSTRAINT "Preparation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
