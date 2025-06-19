/*
  Warnings:

  - You are about to drop the column `profil_id` on the `Compte` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[compte_id]` on the table `Fichier` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Compte" DROP CONSTRAINT "Compte_profil_id_fkey";

-- DropIndex
DROP INDEX "Compte_profil_id_key";

-- AlterTable
ALTER TABLE "Compte" DROP COLUMN "profil_id";

-- AlterTable
ALTER TABLE "Fichier" ADD COLUMN     "compte_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Fichier_compte_id_key" ON "Fichier"("compte_id");

-- AddForeignKey
ALTER TABLE "Fichier" ADD CONSTRAINT "Fichier_compte_id_fkey" FOREIGN KEY ("compte_id") REFERENCES "Compte"("id") ON DELETE SET NULL ON UPDATE CASCADE;
