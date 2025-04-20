/*
  Warnings:

  - You are about to drop the column `end_time_string` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `start_time_string` on the `appointments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "end_time_string",
DROP COLUMN "start_time_string";
