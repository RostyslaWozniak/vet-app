-- CreateEnum
CREATE TYPE "schedule_day_of_week" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "roles" AS ENUM ('ADMIN', 'VET', 'CLIENT');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "salt" TEXT,
    "roles" "roles"[] DEFAULT ARRAY['CLIENT']::"roles"[],
    "photo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_oauth_accounts" (
    "user_id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_oauth_accounts_pkey" PRIMARY KEY ("provider_account_id","provider")
);

-- CreateTable
CREATE TABLE "vet_profiles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vet_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "duration_in_minutes" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vet_services" (
    "id" TEXT NOT NULL,
    "vet_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,

    CONSTRAINT "vet_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vet_schedules" (
    "id" TEXT NOT NULL,
    "vet_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vet_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vet_schedule_availabilities" (
    "id" TEXT NOT NULL,
    "vet_schedule_id" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "day_of_week" "schedule_day_of_week" NOT NULL,

    CONSTRAINT "vet_schedule_availabilities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_oauth_accounts_provider_account_id_key" ON "user_oauth_accounts"("provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "vet_profiles_user_id_key" ON "vet_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "vet_schedules_vet_id_key" ON "vet_schedules"("vet_id");

-- CreateIndex
CREATE INDEX "vet_schedule_id_index" ON "vet_schedule_availabilities"("vet_schedule_id");

-- AddForeignKey
ALTER TABLE "user_oauth_accounts" ADD CONSTRAINT "user_oauth_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vet_profiles" ADD CONSTRAINT "vet_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vet_services" ADD CONSTRAINT "vet_services_vet_id_fkey" FOREIGN KEY ("vet_id") REFERENCES "vet_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vet_services" ADD CONSTRAINT "vet_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vet_schedules" ADD CONSTRAINT "vet_schedules_vet_id_fkey" FOREIGN KEY ("vet_id") REFERENCES "vet_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vet_schedule_availabilities" ADD CONSTRAINT "vet_schedule_availabilities_vet_schedule_id_fkey" FOREIGN KEY ("vet_schedule_id") REFERENCES "vet_schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
