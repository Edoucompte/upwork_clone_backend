/*
  Warnings:

  - Changed the type of `taux_horaire` on the `Compte` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Compte" DROP COLUMN "taux_horaire",
ADD COLUMN     "taux_horaire" INTEGER NOT NULL;
