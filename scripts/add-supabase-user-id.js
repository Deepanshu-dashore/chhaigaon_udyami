const { Client } = require('pg');
require('dotenv').config();

async function main() {
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  console.log("Connecting to PostgreSQL...");
  const client = new Client({ connectionString });
  await client.connect();

  console.log("Adding column supabaseUserId if not exists...");
  await client.query('ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "supabaseUserId" TEXT;');
  
  console.log("Creating unique index on supabaseUserId if not exists...");
  await client.query('CREATE UNIQUE INDEX IF NOT EXISTS "User_supabaseUserId_key" ON "User"("supabaseUserId");');

  console.log("Creating index on role and status if not exists...");
  await client.query('CREATE INDEX IF NOT EXISTS "User_role_status_idx" ON "User"("role", "status");');

  const res = await client.query('SELECT column_name, data_type FROM information_schema.columns WHERE table_name = \'User\';');
  console.log("Current User columns in DB:", res.rows.map(r => r.column_name));

  await client.end();
  console.log("Done successfully!");
}

main().catch(err => {
  console.error("Migration script error:", err);
  process.exit(1);
});
