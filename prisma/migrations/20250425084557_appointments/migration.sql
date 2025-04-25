/*
  Warnings:

  - A unique constraint covering the columns `[start_time,vet_schedule_id,status]` on the table `appointments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "appointments_start_time_vet_schedule_id_status_key" ON "appointments"("start_time", "vet_schedule_id", "status");
