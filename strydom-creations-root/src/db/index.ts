import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
  __arenaNextJsDrizzle?: ReturnType<typeof drizzle>;
};

/**
 * The database pool is created lazily (on first use) instead of at module
 * load. During `next build`, Next.js imports every API route to collect page
 * data — if we threw "DATABASE_URL is required" at import time, the whole
 * build would fail whenever the env var isn't set yet (e.g. a fresh Vercel
 * project before the Postgres database is created).
 *
 * Now the build always succeeds. If DATABASE_URL really is missing, the error
 * is raised only when an endpoint actually queries the database, with a clear
 * message.
 */
function getPool(): Pool {
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is required. Add it to .env.local for local development, " +
        "or to Vercel Environment Variables (Settings → Environment Variables) for production.",
    );
  }
  globalForDb.__arenaNextJsPostgresqlPool ??= new Pool({
    connectionString: databaseUrl,
  });
  return globalForDb.__arenaNextJsPostgresqlPool;
}

export function getDb() {
  globalForDb.__arenaNextJsDrizzle ??= drizzle(getPool());
  return globalForDb.__arenaNextJsDrizzle;
}
