-- DropForeignKey
ALTER TABLE "Fichier" DROP CONSTRAINT "Fichier_certification_id_fkey";

-- AlterTable
ALTER TABLE "Fichier" ALTER COLUMN "certification_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Fichier" ADD CONSTRAINT "Fichier_certification_id_fkey" FOREIGN KEY ("certification_id") REFERENCES "Certification"("id") ON DELETE SET NULL ON UPDATE CASCADE;
