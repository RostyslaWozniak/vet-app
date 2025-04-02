/*
  Warnings:

  - The values [GOOGLE,GITHUB,FACEBOOK] on the enum `auth_provider` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "auth_provider_new" AS ENUM ('google', 'github', 'facebook');
ALTER TABLE "user_oauth_accounts" ALTER COLUMN "provider" TYPE "auth_provider_new" USING ("provider"::text::"auth_provider_new");
ALTER TYPE "auth_provider" RENAME TO "auth_provider_old";
ALTER TYPE "auth_provider_new" RENAME TO "auth_provider";
DROP TYPE "auth_provider_old";
COMMIT;
