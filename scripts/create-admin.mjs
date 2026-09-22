// One-time script to seed the first admin (owner) account.
// Usage: node --env-file=.env.local scripts/create-admin.mjs "Full Name" email@example.com "password"
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const [name, emailRaw, password] = process.argv.slice(2);

if (!name || !emailRaw || !password) {
  console.error('Usage: node --env-file=.env.local scripts/create-admin.mjs "Full Name" email@example.com "password"');
  process.exit(1);
}

if (password.length < 8) {
  console.error('Password must be at least 8 characters.');
  process.exit(1);
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Missing MONGODB_URI (did you forget --env-file=.env.local?)');
  process.exit(1);
}

const dbName = process.env.MONGODB_DB || 'maracana';
const email = emailRaw.trim().toLowerCase();

const client = new MongoClient(uri);
await client.connect();
const db = client.db(dbName);
const users = db.collection('admin_users');

await users.createIndex({ email: 1 }, { unique: true });

const existing = await users.findOne({ email });
if (existing) {
  console.error(`An account with email ${email} already exists.`);
  await client.close();
  process.exit(1);
}

const passwordHash = await bcrypt.hash(password, 12);
await users.insertOne({
  email,
  passwordHash,
  name: name.trim(),
  role: 'owner',
  createdAt: new Date(),
});

console.log(`Created owner account for ${email}.`);
await client.close();
process.exit(0);
