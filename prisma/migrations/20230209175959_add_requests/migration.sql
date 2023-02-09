/*
  Warnings:

  - You are about to drop the column `ownerId` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `records` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `organization_owners` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[ownerUid]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerUid` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorUid` to the `records` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "records" DROP CONSTRAINT "records_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_organizationId_fkey";

-- DropIndex
DROP INDEX "organizations_ownerId_key";

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "ownerId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ownerUid" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "records" DROP COLUMN "creatorId",
ADD COLUMN     "creatorUid" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "organizationId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "memberOrganizationId" INTEGER,
ADD COLUMN     "ownerOrganizationId" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "organization_owners";

-- CreateTable
CREATE TABLE "requests" (
    "id" SERIAL NOT NULL,
    "productCode" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT,
    "organizationId" INTEGER NOT NULL,
    "requesterUid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_ownerUid_key" ON "organizations"("ownerUid");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_memberOrganizationId_fkey" FOREIGN KEY ("memberOrganizationId") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_ownerUid_fkey" FOREIGN KEY ("ownerUid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_creatorUid_fkey" FOREIGN KEY ("creatorUid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_requesterUid_fkey" FOREIGN KEY ("requesterUid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
