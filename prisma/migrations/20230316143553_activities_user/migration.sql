/*
  Warnings:

  - You are about to drop the column `day` on the `Activities` table. All the data in the column will be lost.
  - You are about to drop the column `lectureName` on the `Activities` table. All the data in the column will be lost.
  - You are about to drop the column `numberVacancies` on the `Activities` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[“lecturename”]` on the table `Activities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `data` to the `Activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `“lecturename”` to the `Activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `“numbervacancies”` to the `Activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `“userid”` to the `Activities` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Activities_lectureName_key";

-- AlterTable
ALTER TABLE "Activities" DROP COLUMN "day",
DROP COLUMN "lectureName",
DROP COLUMN "numberVacancies",
ADD COLUMN     "data" DATE NOT NULL,
ADD COLUMN     "“lecturename”" VARCHAR(40) NOT NULL,
ADD COLUMN     "“numbervacancies”" INTEGER NOT NULL,
ADD COLUMN     "“userid”" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Activities_“lecturename”_key" ON "Activities"("“lecturename”");

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_“userid”_fkey" FOREIGN KEY ("“userid”") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
