/*
  Warnings:

  - You are about to drop the column `appointment_time` on the `appointments` table. All the data in the column will be lost.
  - Changed the type of `start_time` on the `vet_schedule_availabilities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `end_time` on the `vet_schedule_availabilities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "appointment_time";

-- AlterTable
ALTER TABLE "vet_schedule_availabilities" DROP COLUMN "start_time",
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL,
DROP COLUMN "end_time",
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL;
