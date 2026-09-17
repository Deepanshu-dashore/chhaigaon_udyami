const { Client } = require('pg');
require('dotenv').config();

async function main() {
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  console.log("Connecting to PostgreSQL...");
  const client = new Client({ connectionString });
  await client.connect();

  console.log("Creating AuthActionType enum if not exists...");
  await client.query(`
    DO $$ BEGIN
      CREATE TYPE "AuthActionType" AS ENUM ('LOGIN', 'LOGOUT', 'SIGNUP', 'PASSWORD_RESET', 'TOKEN_REFRESH');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);

  console.log("Adding columns to User table if not exists...");
  await client.query(`
    ALTER TABLE "User" 
    ADD COLUMN IF NOT EXISTS "isOnline" BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN IF NOT EXISTS "lastLoginAt" TIMESTAMP(3),
    ADD COLUMN IF NOT EXISTS "lastLogoutAt" TIMESTAMP(3);
  `);

  await client.query(`
    CREATE INDEX IF NOT EXISTS "User_isOnline_idx" ON "User"("isOnline");
  `);

  console.log("Creating UserActivityLog table if not exists...");
  await client.query(`
    CREATE TABLE IF NOT EXISTS "UserActivityLog" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "userId" TEXT NOT NULL,
      "action" "AuthActionType" NOT NULL,
      "ipAddress" TEXT,
      "userAgent" TEXT,
      "deviceInfo" TEXT,
      "provider" TEXT,
      "metadata" JSONB,
      "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "UserActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
    );
  `);

  await client.query(`
    CREATE INDEX IF NOT EXISTS "UserActivityLog_userId_timestamp_idx" ON "UserActivityLog"("userId", "timestamp");
    CREATE INDEX IF NOT EXISTS "UserActivityLog_action_timestamp_idx" ON "UserActivityLog"("action", "timestamp");
  `);

  console.log("Activity logging schema successfully synced to Postgres!");
  await client.end();
}

main().catch(err => {
  console.error("Migration error:", err);
  process.exit(1);
});
