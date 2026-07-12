/*
  Warnings:

  - Added the required column `updatedAt` to the `PasswordResetToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PasswordResetToken" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
