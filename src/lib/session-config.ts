import type { SessionOptions } from 'iron-session';

export interface SessionData {
  userId?: string;
  email?: string;
  name?: string;
  role?: 'owner' | 'staff';
}

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error('Missing SESSION_SECRET environment variable');
  }
  return secret;
}

// A Proxy defers reading `password` until iron-session actually accesses it
// (i.e. on first real session read/write), instead of at module import time.
export const sessionOptions: SessionOptions = {
  get password() {
    return getSessionSecret();
  },
  cookieName: 'maracana_admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  },
} as SessionOptions;
