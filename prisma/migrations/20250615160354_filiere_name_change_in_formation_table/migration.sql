/*
  Warnings:

  - You are about to drop the column `Filiere` on the `Formation` table. All the data in the column will be lost.
  - Added the required column `filiere` to the `Formation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Formation" DROP COLUMN "Filiere",
ADD COLUMN     "filiere" TEXT NOT NULL;
