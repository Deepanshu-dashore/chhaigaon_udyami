# Directory & File Structure

```
chhaigaon_udyami/
├── app/                  # Next.js App Router
│   ├── api/              # API Route Handlers (auth, webhooks)
│   ├── auth/             # Authentication pages (login, register, OTP)
│   ├── layout.tsx        # Root layout with fonts and providers
│   └── page.tsx          # Homepage landing page
├── components/           # UI Components
│   ├── admin/            # Admin portal widgets
│   ├── auth/             # Login / Register forms
│   ├── course/           # Course cards and viewers
│   ├── dashboard/        # Dashboard layout, sidebar, stats
│   ├── quiz/             # Quiz questions and score summaries
│   ├── ui/               # Reusable primitives (buttons, cards, inputs)
│   └── video/            # VdoCipher video player component
├── lib/                  # Shared utilities and database singletons
│   ├── supabase/         # Supabase client/server SSR wrappers
│   └── utils.ts          # Classname merger (clsx + twMerge)
├── prisma/               # Database schema and migration SQLs
│   └── schema.prisma     # Prisma models, enums and indexes
├── services/             # Business logic layer
│   ├── course.service.ts # Course queries and mutations
│   ├── payment.service.ts# Razorpay order generation & verification
│   └── scheme.service.ts # Government scheme filtering & fetch
└── scripts/              # Developer tooling & autonomous loops
    └── ralph/            # Ralph Wiggum autonomous execution loop
```
