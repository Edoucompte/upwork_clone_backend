/*
  Warnings:

  - A unique constraint covering the columns `[compte_id,nom]` on the table `Langue` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "entreprise" TEXT NOT NULL,
    "emplacement" TEXT NOT NULL,
    "pays" TEXT NOT NULL,
    "travailleActuellement" BOOLEAN NOT NULL DEFAULT false,
    "dateDebut" TEXT NOT NULL,
    "dateFin" TEXT,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "compte_id" INTEGER NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Langue_compte_id_nom_key" ON "Langue"("compte_id", "nom");

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_compte_id_fkey" FOREIGN KEY ("compte_id") REFERENCES "Compte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
