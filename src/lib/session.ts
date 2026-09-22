import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, type SessionData } from './session-config';

export type { SessionData };

// For use in Server Components, Server Actions, and Route Handlers.
export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session.userId) {
    throw new Error('Not authenticated');
  }
  return session;
}

export async function requireOwner() {
  const session = await requireAdmin();
  if (session.role !== 'owner') {
    throw new Error('Owner access required');
  }
  return session;
}
