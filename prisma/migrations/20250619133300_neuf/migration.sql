-- AlterTable
ALTER TABLE "Fichier" ADD COLUMN     "portfolio_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Fichier" ADD CONSTRAINT "Fichier_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "Portfolio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
