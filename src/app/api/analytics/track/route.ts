import { NextRequest, NextResponse } from 'next/server';
import { analyticsEventsCollection, type DeviceType } from '../../../../lib/collections';

function detectDevice(userAgent: string): DeviceType {
  const ua = userAgent.toLowerCase();
  if (/tablet|ipad/.test(ua)) return 'tablet';
  if (/mobi|android|iphone/.test(ua)) return 'mobile';
  return 'desktop';
}

export async function POST(request: NextRequest) {
  let body: { path?: string; referrer?: string; sessionId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!body.sessionId) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const userAgent = request.headers.get('user-agent') || '';
  const events = await analyticsEventsCollection();
  await events.insertOne({
    type: 'pageview',
    path: body.path,
    referrer: body.referrer,
    sessionId: body.sessionId,
    device: detectDevice(userAgent),
    createdAt: new Date(),
  });

  return NextResponse.json({ ok: true });
}
