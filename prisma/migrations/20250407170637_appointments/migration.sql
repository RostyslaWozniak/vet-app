/*
  Warnings:

  - You are about to drop the column `vetScheduleId` on the `vet_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `vet_id` on the `vet_schedules` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "appointment_status" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "vet_schedules" DROP CONSTRAINT "vet_schedules_vet_id_fkey";

-- DropIndex
DROP INDEX "vet_schedules_vet_id_key";

-- AlterTable
ALTER TABLE "vet_profiles" DROP COLUMN "vetScheduleId";

-- AlterTable
ALTER TABLE "vet_schedules" DROP COLUMN "vet_id";

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "vet_schedule_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "appointment_time" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "status" "appointment_status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_vet_schedule_id_fkey" FOREIGN KEY ("vet_schedule_id") REFERENCES "vet_schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
