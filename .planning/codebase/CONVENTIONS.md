# Development Conventions

## Coding Standards
1. **TypeScript First**: Strict typing on all service inputs, API returns, and component props. Avoid `any`.
2. **Next.js 16 App Router Conventions**:
   - Keep Server Components by default; only add `'use client'` when state, event handlers, or browser APIs are required.
   - Use Next.js 16 async dynamic route parameters where applicable.
3. **Database & Queries**:
   - Access Postgres via Prisma models or Supabase Client with proper error handling.
   - Ensure foreign key constraints and cascade rules match `prisma/schema.prisma`.
4. **Styling with Tailwind CSS v4**:
   - Use utility classes combined via `cn()` helper in `lib/utils.ts`.
   - Maintain mobile-first responsive design suitable for rural mobile users.
5. **Quality Verification**:
   - Typechecking: `npx tsc --noEmit`
   - Linting: `npm run lint`
