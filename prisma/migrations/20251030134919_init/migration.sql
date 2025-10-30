-- CreateTable
CREATE TABLE "web_proofs" (
    "id" TEXT NOT NULL,
    "proof_id" TEXT NOT NULL,
    "provider" TEXT,
    "subject" TEXT,
    "resource" TEXT,
    "status" TEXT,
    "proof_url" TEXT,
    "payload" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "web_proofs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "web_proofs_proof_id_key" ON "web_proofs"("proof_id");

-- CreateIndex
CREATE INDEX "web_proofs_proof_id_idx" ON "web_proofs"("proof_id");

-- CreateIndex
CREATE INDEX "web_proofs_subject_idx" ON "web_proofs"("subject");

-- CreateIndex
CREATE INDEX "web_proofs_created_at_idx" ON "web_proofs"("created_at" DESC);
