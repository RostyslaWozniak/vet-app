/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "phoneNumber",
ADD COLUMN     "phone_number" TEXT NOT NULL DEFAULT '+48 777 777 777';
