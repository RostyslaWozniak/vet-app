/*
  Warnings:

  - Added the required column `vetScheduleId` to the `vet_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "vet_schedules" DROP CONSTRAINT "vet_schedules_vet_id_fkey";

-- AlterTable
ALTER TABLE "vet_profiles" ADD COLUMN     "vetScheduleId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "vet_schedules" ADD CONSTRAINT "vet_schedules_vet_id_fkey" FOREIGN KEY ("vet_id") REFERENCES "vet_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
