-- DropForeignKey
ALTER TABLE "Competence" DROP CONSTRAINT "Competence_compte_id_fkey";

-- DropForeignKey
ALTER TABLE "Competence" DROP CONSTRAINT "Competence_portfolio_id_fkey";

-- AlterTable
ALTER TABLE "Competence" ALTER COLUMN "compte_id" DROP NOT NULL,
ALTER COLUMN "portfolio_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Competence" ADD CONSTRAINT "Competence_compte_id_fkey" FOREIGN KEY ("compte_id") REFERENCES "Compte"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competence" ADD CONSTRAINT "Competence_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "Portfolio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
