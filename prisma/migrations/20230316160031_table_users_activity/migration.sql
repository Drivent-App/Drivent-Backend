/*
  Warnings:

  - You are about to drop the column `“lecturename”` on the `Activities` table. All the data in the column will be lost.
  - You are about to drop the column `“numbervacancies”` on the `Activities` table. All the data in the column will be lost.
  - You are about to drop the column `“userid”` on the `Activities` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lectureName]` on the table `Activities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lectureName` to the `Activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberVacancies` to the `Activities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activities" DROP CONSTRAINT "Activities_“userid”_fkey";

-- DropIndex
DROP INDEX "Activities_“lecturename”_key";

-- AlterTable
ALTER TABLE "Activities" DROP COLUMN "“lecturename”",
DROP COLUMN "“numbervacancies”",
DROP COLUMN "“userid”",
ADD COLUMN     "lectureName" VARCHAR(40) NOT NULL,
ADD COLUMN     "numberVacancies" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "UsersActivity" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "UsersActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Activities_lectureName_key" ON "Activities"("lectureName");

-- AddForeignKey
ALTER TABLE "UsersActivity" ADD CONSTRAINT "UsersActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UsersActivity" ADD CONSTRAINT "UsersActivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
