# Technical Concerns & Watchlist

## 1. Next.js 16 Breaking Changes
- Next 16 treats `params` and `searchParams` in App Router page components as asynchronous Promises. Always `await params` in dynamic routes.

## 2. Supabase SSR Session Refresh
- Ensure server actions and API routes always use the server-side Supabase client created via `createServerClient` from `@supabase/ssr` with cookie handler.

## 3. Database RLS vs Prisma Adapter
- When using Prisma with `@prisma/adapter-pg` against a database with Row Level Security (RLS) enabled, ensure service role keys or appropriate user session claims are passed if RLS policies restrict operations.
