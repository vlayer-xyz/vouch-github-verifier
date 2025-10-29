'use client';

import { useState } from 'react';
import { Vouch } from '@getvouch/sdk';

export default function Home() {
  const [githubOwner, setGithubOwner] = useState('');
  const [githubRepo, setGithubRepo] = useState('');
  const [githubUsername, setGithubUsername] = useState('');

  const startVerification = () => {
    const vouch = new Vouch();
    const verificationUrl = vouch.getStartUrl({
      requestId: window.crypto.randomUUID(),
      datasourceId: "ee72bdf7-cf47-424a-9705-75a96e39153e",
      customerId: "1be03be8-5014-413c-835a-feddf4020da2",
      redirectBackUrl: `${window.location.origin}`,
      webhookUrl: `https://docs.getvouch.io/api/web-proof`,
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