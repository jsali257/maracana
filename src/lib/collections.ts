import { ObjectId } from 'mongodb';
import { getDb } from './mongodb';

export interface VipMember {
  _id?: ObjectId;
  name: string;
  phone: string;
  email?: string;
  consent: true;
  consentedAt: Date;
  status: 'active' | 'unsubscribed';
  createdAt: Date;
}

export interface Reservation {
  _id?: ObjectId;
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: string;
  seatingPreference: string;
  eventName?: string;
  specialRequests?: string;
  confirmationCode: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

export interface AdminUser {
  _id?: ObjectId;
  email: string;
  passwordHash: string;
  name: string;
  role: 'owner' | 'staff';
  createdAt: Date;
}

export type AnalyticsEventType = 'pageview' | 'reservation_submitted' | 'vip_signup';
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface AnalyticsEvent {
  _id?: ObjectId;
  type: AnalyticsEventType;
  path?: string;
  sessionId: string;
  referrer?: string;
  device?: DeviceType;
  createdAt: Date;
}

export async function vipMembersCollection() {
  const db = await getDb();
  return db.collection<VipMember>('vip_members');
}

export async function reservationsCollection() {
  const db = await getDb();
  return db.collection<Reservation>('reservations');
}

export async function adminUsersCollection() {
  const db = await getDb();
  return db.collection<AdminUser>('admin_users');
}

export async function analyticsEventsCollection() {
  const db = await getDb();
  return db.collection<AnalyticsEvent>('analytics_events');
}

// One-time index setup; safe to call repeatedly (createIndex is idempotent).
export async function ensureIndexes() {
  const [vip, users] = await Promise.all([vipMembersCollection(), adminUsersCollection()]);
  await Promise.all([
    vip.createIndex({ phone: 1 }, { unique: true }),
    users.createIndex({ email: 1 }, { unique: true }),
  ]);
}

function daysAgo(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

export async function getOverviewStats() {
  const [reservations, vip, events] = await Promise.all([
    reservationsCollection(),
    vipMembersCollection(),
    analyticsEventsCollection(),
  ]);

  const [reservationsThisWeek, activeVipCount, pageviewsLast7Days] = await Promise.all([
    reservations.countDocuments({ createdAt: { $gte: daysAgo(7) } }),
    vip.countDocuments({ status: 'active' }),
    events.countDocuments({ type: 'pageview', createdAt: { $gte: daysAgo(7) } }),
  ]);

  return { reservationsThisWeek, activeVipCount, pageviewsLast7Days };
}

export async function getRecentReservations(limit = 5) {
  const reservations = await reservationsCollection();
  return reservations.find().sort({ createdAt: -1 }).limit(limit).toArray();
}

export async function getRecentVipSignups(limit = 5) {
  const vip = await vipMembersCollection();
  return vip.find().sort({ createdAt: -1 }).limit(limit).toArray();
}

export async function getAllReservations(status?: Reservation['status']) {
  const reservations = await reservationsCollection();
  const filter = status ? { status } : {};
  return reservations.find(filter).sort({ createdAt: -1 }).toArray();
}

export async function getAllVipMembers() {
  const vip = await vipMembersCollection();
  return vip.find().sort({ createdAt: -1 }).toArray();
}

export async function getAllAdminUsers() {
  const users = await adminUsersCollection();
  return users.find().sort({ createdAt: 1 }).toArray();
}

export async function getPageviewsByDay(days = 30) {
  const events = await analyticsEventsCollection();
  const since = daysAgo(days);
  const results = await events
    .aggregate<{ _id: string; count: number }>([
      { $match: { type: 'pageview', createdAt: { $gte: since } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ])
    .toArray();

  // Fill in any gap days with 0 so the chart has a continuous x-axis.
  const byDate = new Map(results.map(r => [r._id, r.count]));
  const out: { date: string; count: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = daysAgo(i);
    const key = d.toISOString().slice(0, 10);
    out.push({ date: key, count: byDate.get(key) ?? 0 });
  }
  return out;
}

export async function getTopReferrers(days = 30, limit = 5) {
  const events = await analyticsEventsCollection();
  return events
    .aggregate<{ _id: string; count: number }>([
      {
        $match: {
          type: 'pageview',
          createdAt: { $gte: daysAgo(days) },
          referrer: { $exists: true, $ne: '' },
        },
      },
      { $group: { _id: '$referrer', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
    ])
    .toArray();
}

export async function getDeviceBreakdown(days = 30) {
  const events = await analyticsEventsCollection();
  return events
    .aggregate<{ _id: string; count: number }>([
      { $match: { type: 'pageview', createdAt: { $gte: daysAgo(days) } } },
      { $group: { _id: '$device', count: { $sum: 1 } } },
    ])
    .toArray();
}

export async function getConversionCounts(days = 30) {
  const events = await analyticsEventsCollection();
  const since = daysAgo(days);
  const [reservationsSubmitted, vipSignups, pageviews] = await Promise.all([
    events.countDocuments({ type: 'reservation_submitted', createdAt: { $gte: since } }),
    events.countDocuments({ type: 'vip_signup', createdAt: { $gte: since } }),
    events.countDocuments({ type: 'pageview', createdAt: { $gte: since } }),
  ]);
  return { reservationsSubmitted, vipSignups, pageviews };
}
