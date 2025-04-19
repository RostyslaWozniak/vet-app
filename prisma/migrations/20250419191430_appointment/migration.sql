-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "end_time_string" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "start_time_string" TEXT NOT NULL DEFAULT '';
