/*
  Warnings:

  - You are about to drop the column `proof_url` on the `web_proofs` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `web_proofs` table. All the data in the column will be lost.
  - You are about to drop the column `resource` on the `web_proofs` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `web_proofs` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `web_proofs` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."web_proofs_subject_idx";

-- AlterTable
ALTER TABLE "web_proofs" DROP COLUMN "proof_url",
DROP COLUMN "provider",
DROP COLUMN "resource",
DROP COLUMN "status",
DROP COLUMN "subject";
