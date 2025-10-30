import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { requestId: string } }
) {
  try {
    const requestId = params.requestId;
    
    // Find by requestId
    const proof = await prisma.webProof.findFirst({
      where: { requestId: requestId },
      orderBy: { createdAt: 'desc' },
    });
    
    if (!proof) {
      return NextResponse.json(
        { error: 'Proof not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(proof);
  } catch (error) {
    console.error('Error fetching web proof:', error);
    return NextResponse.json(
      { error: 'Failed to fetch web proof' },
      { status: 500 }
    );
  }
}

