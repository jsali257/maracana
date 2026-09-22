import { MongoClient, type Db } from 'mongodb';

// Cache the client promise on the global object so Next.js's dev-mode module
// reloading doesn't open a new connection pool on every file change, and so
// the connection is only ever opened lazily on first real use (never as a
// side effect of merely importing this module, e.g. during static build).
const globalForMongo = globalThis as unknown as { _mongoClientPromise?: Promise<MongoClient> };

function getClientPromise(): Promise<MongoClient> {
  if (!globalForMongo._mongoClientPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('Missing MONGODB_URI environment variable');
    }
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect();
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(process.env.MONGODB_DB || 'maracana');
}
