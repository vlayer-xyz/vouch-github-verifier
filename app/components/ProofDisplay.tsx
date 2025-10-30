'use client';

interface WebProof {
  id: string;
  proofId: string;
  requestId: string | null;
  payload: any;
  createdAt: string;
}

interface ProofDisplayProps {
  proof: WebProof;
}

export default function ProofDisplay({ proof }: ProofDisplayProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="mt-12 p-6 rounded-lg bg-gray-900 border border-gray-800">
      <h2 className="text-2xl font-light mb-6">✓ Verification Complete</h2>
      
      <div className="space-y-4">
        <div>
          <span className="text-sm text-gray-500">Verified At:</span>
          <p className="text-white">{formatDate(proof.createdAt)}</p>
        </div>
        
        <details className="mt-4" open>
          <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-300 mb-2">
            View Verification Data
          </summary>
          <pre className="mt-2 p-4 bg-black rounded text-xs overflow-x-auto border border-gray-800">
            {JSON.stringify(proof.payload, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}

