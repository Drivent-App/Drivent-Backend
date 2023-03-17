/*
  Warnings:

  - You are about to drop the column `created_at` on the `Activities` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Activities` table. All the data in the column will be lost.
  - Added the required column `day` to the `Activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeEnd` to the `Activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeStart` to the `Activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UsersActivity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activities" DROP COLUMN "created_at",
DROP COLUMN "data",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "day" DATE NOT NULL,
ADD COLUMN     "timeEnd" DATE NOT NULL,
ADD COLUMN     "timeStart" DATE NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UsersActivity" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
