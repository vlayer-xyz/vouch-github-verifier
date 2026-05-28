import { Vouch } from '@getvouch/sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { requestId, redirectBackUrl, webhookUrl, inputs } = await request.json();

    const vouch = new Vouch({
      customerId: '1be03be8-5014-413c-835a-feddf4020da2',
      apiKey: process.env.VOUCH_API_KEY!,
    });

    const { verificationUrl } = await vouch.getDataSourceUrl({
      datasourceId: 'ee72bdf7-cf47-424a-9705-75a96e39153e',
      requestId,
      redirectBackUrl,
      webhookUrl,
      inputs,
    });

    return NextResponse.json({ verificationUrl });
  } catch (error) {
    console.error('Error starting verification:', error);
    return NextResponse.json({ error: 'Failed to start verification' }, { status: 500 });
  }
}
