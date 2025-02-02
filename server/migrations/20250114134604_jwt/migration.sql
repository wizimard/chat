/*
  Warnings:

  - You are about to drop the column `token` on the `AuthToken` table. All the data in the column will be lost.
  - Added the required column `accessToken` to the `AuthToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `AuthToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuthToken" DROP COLUMN "token",
ADD COLUMN     "accessToken" TEXT NOT NULL,
ADD COLUMN     "refreshToken" TEXT NOT NULL;
