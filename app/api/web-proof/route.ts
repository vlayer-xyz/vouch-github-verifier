import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    
    // Vouch includes requestId in the webhook payload - log to see the structure
    console.log('Received webhook payload:', JSON.stringify(payload, null, 2));
    
    // Extract requestId from payload (location may vary - check the logs)
    const requestId = payload.requestId || payload.request_id || null;
    
    // Store the proof in the database
    await prisma.webProof.upsert({
      where: { proofId: payload.proofId || '' },
      update: {
        requestId: requestId,
        payload: payload,
      },
      create: {
        proofId: payload.proofId || '',
        requestId: requestId,
        payload: payload,
      },
    });
    
    console.log('Web proof stored:', payload.proofId || 'no-id', 'for request:', requestId);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error storing web proof:', error);
    return NextResponse.json(
      { error: 'Failed to store web proof' },
      { status: 500 }
    );
  }
}

// Allow GET to check if the endpoint is working
export async function GET() {
  return NextResponse.json({ message: 'Web proof endpoint is running' }, { status: 200 });
}

