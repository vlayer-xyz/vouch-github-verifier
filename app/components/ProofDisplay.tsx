'use client';

interface WebProof {
  id: string;
  proofId: string;
  requestId: string | null;
  provider: string | null;
  subject: string | null;
  resource: string | null;
  status: string | null;
  proofUrl: string | null;
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
        {proof.status && (
          <div>
            <span className="text-sm text-gray-500">Status:</span>
            <span className="ml-2 px-2 py-1 rounded bg-green-900/30 text-green-300 text-sm">
              {proof.status}
            </span>
          </div>
        )}
        
        {proof.subject && (
          <div>
            <span className="text-sm text-gray-500">Subject:</span>
            <p className="text-white">{proof.subject}</p>
          </div>
        )}
        
        {proof.resource && (
          <div>
            <span className="text-sm text-gray-500">Resource:</span>
            <p className="text-white">{proof.resource}</p>
          </div>
        )}
        
        {proof.proofUrl && (
          <div>
            <span className="text-sm text-gray-500">Proof URL:</span>
            <a 
              href={proof.proofUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-2 text-blue-400 hover:text-blue-300 underline"
            >
              View Proof
            </a>
          </div>
        )}
        
        <div>
          <span className="text-sm text-gray-500">Verified At:</span>
          <p className="text-white">{formatDate(proof.createdAt)}</p>
        </div>
        
        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-300">
            View Raw Data
          </summary>
          <pre className="mt-2 p-4 bg-black rounded text-xs overflow-x-auto border border-gray-800">
            {JSON.stringify(proof.payload, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}

