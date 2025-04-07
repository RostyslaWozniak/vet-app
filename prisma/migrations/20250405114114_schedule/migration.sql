/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `vet_schedules` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `vet_schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vet_schedules" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "vet_schedules_user_id_key" ON "vet_schedules"("user_id");

-- AddForeignKey
ALTER TABLE "vet_schedules" ADD CONSTRAINT "vet_schedules_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
