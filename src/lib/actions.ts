'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { ObjectId } from 'mongodb';
import {
  adminUsersCollection,
  analyticsEventsCollection,
  reservationsCollection,
  vipMembersCollection,
} from './collections';
import { getSession, requireAdmin, requireOwner } from './session';

type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

function generateConfirmationCode() {
  return `EM-${Math.floor(1000 + Math.random() * 9000)}`;
}

export interface ReservationInput {
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: string;
  seatingPreference: string;
  eventName?: string;
  specialRequests?: string;
}

export async function submitReservation(
  input: ReservationInput
): Promise<ActionResult<{ confirmationCode: string }>> {
  if (!input.name?.trim() || !input.phone?.trim() || !input.date?.trim() || !input.time?.trim()) {
    return { ok: false, error: 'Please fill in all required fields.' };
  }

  const confirmationCode = generateConfirmationCode();
  const reservations = await reservationsCollection();
  await reservations.insertOne({
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email?.trim() || undefined,
    date: input.date.trim(),
    time: input.time.trim(),
    guests: input.guests,
    seatingPreference: input.seatingPreference,
    eventName: input.eventName?.trim() || undefined,
    specialRequests: input.specialRequests?.trim() || undefined,
    confirmationCode,
    status: 'pending',
    createdAt: new Date(),
  });

  const events = await analyticsEventsCollection();
  await events.insertOne({
    type: 'reservation_submitted',
    sessionId: 'server',
    createdAt: new Date(),
  });

  return { ok: true, data: { confirmationCode } };
}

export interface VipSignupInput {
  name: string;
  phone: string;
  email?: string;
}

export async function submitVipSignup(input: VipSignupInput): Promise<ActionResult> {
  if (!input.name?.trim() || !input.phone?.trim()) {
    return { ok: false, error: 'Name and phone number are required.' };
  }

  const vip = await vipMembersCollection();
  const phone = input.phone.trim();
  const existing = await vip.findOne({ phone });
  if (existing) {
    if (existing.status === 'unsubscribed') {
      await vip.updateOne({ phone }, { $set: { status: 'active', consentedAt: new Date() } });
    }
    // Already signed up (or just re-activated) — treat as success either way.
    return { ok: true, data: undefined };
  }

  await vip.insertOne({
    name: input.name.trim(),
    phone,
    email: input.email?.trim() || undefined,
    consent: true,
    consentedAt: new Date(),
    status: 'active',
    createdAt: new Date(),
  });

  const events = await analyticsEventsCollection();
  await events.insertOne({
    type: 'vip_signup',
    sessionId: 'server',
    createdAt: new Date(),
  });

  return { ok: true, data: undefined };
}

export async function loginAction(prevState: unknown, formData: FormData): Promise<{ error?: string }> {
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const users = await adminUsersCollection();
  const user = await users.findOne({ email });
  if (!user) {
    return { error: 'Invalid email or password.' };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { error: 'Invalid email or password.' };
  }

  const session = await getSession();
  session.userId = user._id!.toString();
  session.email = user.email;
  session.name = user.name;
  session.role = user.role;
  await session.save();

  redirect('/admin');
}

export async function logoutAction() {
  const session = await getSession();
  session.destroy();
  redirect('/admin/login');
}

export interface CreateStaffInput {
  name: string;
  email: string;
  password: string;
  role: 'owner' | 'staff';
}

export async function createStaffAccount(input: CreateStaffInput): Promise<ActionResult> {
  await requireOwner();

  const email = input.email.trim().toLowerCase();
  if (!input.name?.trim() || !email || !input.password || input.password.length < 8) {
    return { ok: false, error: 'Name, email, and an 8+ character password are required.' };
  }

  const users = await adminUsersCollection();
  const existing = await users.findOne({ email });
  if (existing) {
    return { ok: false, error: 'An account with that email already exists.' };
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  await users.insertOne({
    email,
    passwordHash,
    name: input.name.trim(),
    role: input.role,
    createdAt: new Date(),
  });

  return { ok: true, data: undefined };
}

export async function updateReservationStatus(
  id: string,
  status: 'confirmed' | 'cancelled' | 'pending'
): Promise<ActionResult> {
  await requireAdmin();
  const reservations = await reservationsCollection();
  await reservations.updateOne({ _id: new ObjectId(id) }, { $set: { status } });
  return { ok: true, data: undefined };
}

export async function updateVipStatus(
  id: string,
  status: 'active' | 'unsubscribed'
): Promise<ActionResult> {
  await requireAdmin();
  const vip = await vipMembersCollection();
  await vip.updateOne({ _id: new ObjectId(id) }, { $set: { status } });
  return { ok: true, data: undefined };
}
