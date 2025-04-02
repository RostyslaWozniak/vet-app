/*
  Warnings:

  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "roles" AS ENUM ('ADMIN', 'VET', 'USER');

-- CreateEnum
CREATE TYPE "auth_provider" AS ENUM ('GOOGLE', 'GITHUB', 'FACEBOOK');

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "salt" DROP NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "roles" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Session";

-- DropEnum
DROP TYPE "Roles";

-- CreateTable
CREATE TABLE "user_oauth_accounts" (
    "user_id" TEXT NOT NULL,
    "provider" "auth_provider" NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_oauth_accounts_pkey" PRIMARY KEY ("provider_account_id","provider")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_oauth_accounts_provider_account_id_key" ON "user_oauth_accounts"("provider_account_id");

-- AddForeignKey
ALTER TABLE "user_oauth_accounts" ADD CONSTRAINT "user_oauth_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
