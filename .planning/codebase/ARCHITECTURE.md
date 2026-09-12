# System Architecture

## Architecture Pattern
- **Next.js Fullstack Modular Architecture**:
  - **Client & Server Components**: React 19 server components for high performance data fetching; client components for rich interactive modals, video playback, and quiz assessment.
  - **Data Access Layer**: `services/` contains domain business logic (Course, Payment, Scheme services) querying Supabase/Prisma with proper error boundaries.
  - **Authentication & Guarding**: `middleware.ts` refreshes Supabase auth cookies on each request, enforcing role-based routing (Admin vs Student).
  - **Database & RLS**: Supabase PostgreSQL database governed by Prisma schema definitions and database Row-Level-Security (RLS) policies.
