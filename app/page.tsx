'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Vouch } from '@getvouch/sdk';
import ProofDisplay from '@/app/components/ProofDisplay';

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

function HomeContent() {
  const searchParams = useSearchParams();
  const requestId = searchParams?.get('requestId');
  
  const [githubOwner, setGithubOwner] = useState('');
  const [githubRepo, setGithubRepo] = useState('');
  const [githubUsername, setGithubUsername] = useState('');
  const [proof, setProof] = useState<WebProof | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProof = async () => {
      if (!requestId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/web-proof/${requestId}`);
        if (response.ok) {
          const data = await response.json();
          setProof(data);
        } else {
          setError('Proof not found yet. It may still be processing.');
        }
      } catch (err) {
        setError('Failed to fetch proof');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProof();
  }, [requestId]);

  const startVerification = () => {
    const vouch = new Vouch();
    const requestId = window.crypto.randomUUID();
    
    // Store requestId for later retrieval
    localStorage.setItem('lastRequestId', requestId);
    
    // For local development, use Vercel URL for webhooks (Vouch needs accessible HTTPS)
    // In production, this will automatically use the deployed URL
    const webhookBaseUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL || window.location.origin;
    
    const verificationUrl = vouch.getStartUrl({
      requestId: requestId,
      datasourceId: "ee72bdf7-cf47-424a-9705-75a96e39153e",
      customerId: "1be03be8-5014-413c-835a-feddf4020da2",
      redirectBackUrl: `${window.location.origin}?requestId=${requestId}`,
      webhookUrl: `${webhookBaseUrl}/api/web-proof`,
      inputs: {
        github_owner: githubOwner,
        github_repo: githubRepo,
        github_username: githubUsername
      }
    });
    window.location.href = verificationUrl.toString();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light mb-4">vouch GitHub Prover</h1>
          <p className="text-gray-400 text-lg">Prove contributions to GitHub repositories</p>
        </div>
        <div className="space-y-4 mb-8">
          <input
            value={githubOwner}
            onChange={(e) => setGithubOwner(e.target.value)}
            placeholder="GitHub owner (org or user)"
            className="w-full px-4 py-2 rounded-md bg-gray-900 text-white placeholder-gray-500 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <input
            value={githubRepo}
            onChange={(e) => setGithubRepo(e.target.value)}
            placeholder="GitHub repository"
            className="w-full px-4 py-2 rounded-md bg-gray-900 text-white placeholder-gray-500 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <input
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            placeholder="Your GitHub username"
            className="w-full px-4 py-2 rounded-md bg-gray-900 text-white placeholder-gray-500 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={startVerification}
            className="px-6 py-3 rounded-md bg-white text-black hover:bg-gray-200 transition-colors"
          >
            Start Verification
          </button>
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="mt-12 text-center">
            <p className="text-gray-400">Loading proof...</p>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="mt-12 p-4 rounded-lg bg-red-900/20 border border-red-800 text-red-300">
            <p>{error}</p>
          </div>
        )}
        
        {/* Proof Display */}
        {proof && <ProofDisplay proof={proof} />}
        
        {/* Powered by vlayer Footer */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex justify-center items-center space-x-2 text-gray-500">
            <span className="text-sm">Powered by</span>
            <img 
              src="/powered-by-vlayer.svg" 
              alt="Vlayer" 
              className="h-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}