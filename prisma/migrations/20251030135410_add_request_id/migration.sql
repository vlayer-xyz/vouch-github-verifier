-- AlterTable
ALTER TABLE "web_proofs" ADD COLUMN     "request_id" TEXT;

-- CreateIndex
CREATE INDEX "web_proofs_request_id_idx" ON "web_proofs"("request_id");
