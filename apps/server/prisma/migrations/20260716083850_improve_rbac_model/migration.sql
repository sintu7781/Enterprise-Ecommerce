/*
  Warnings:

  - You are about to drop the column `name` on the `Permission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayName` to the `Permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayName` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `name` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Permission_name_key";

-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "name",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "displayName" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isSystem" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "displayName" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isSystem" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "name",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RolePermission" ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "UserRole" ADD COLUMN     "assignedByUserId" UUID;

-- DropEnum
DROP TYPE "RoleName";

-- CreateIndex
CREATE UNIQUE INDEX "Permission_code_key" ON "Permission"("code");

-- CreateIndex
CREATE INDEX "Permission_code_idx" ON "Permission"("code");

-- CreateIndex
CREATE INDEX "Permission_isActive_idx" ON "Permission"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE INDEX "Role_name_idx" ON "Role"("name");

-- CreateIndex
CREATE INDEX "Role_isActive_idx" ON "Role"("isActive");

-- CreateIndex
CREATE INDEX "RolePermission_permissionId_idx" ON "RolePermission"("permissionId");

-- CreateIndex
CREATE INDEX "UserRole_roleId_idx" ON "UserRole"("roleId");

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_assignedByUserId_fkey" FOREIGN KEY ("assignedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
