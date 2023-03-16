-- CreateTable
CREATE TABLE "Activities" (
    "id" SERIAL NOT NULL,
    "lectureName" VARCHAR(40) NOT NULL,
    "day" DATE NOT NULL,
    "numberVacancies" INTEGER NOT NULL,
    "local" VARCHAR(40) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Activities_lectureName_key" ON "Activities"("lectureName");
