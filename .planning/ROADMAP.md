# Roadmap: Chhaigaon Udyami

## Active Milestone: v1.0 — Core Platform Capabilities

### Phase 1: Foundation & Auth (Complete)
- [x] Next.js 16 + Tailwind CSS v4 foundation
- [x] Supabase SSR Authentication & middleware session gating
- [x] Prisma ORM Schema definition with PostgreSQL RLS support

### Phase 2: Learning Management & Media (Complete)
- [x] Course catalog and 12-course module browser
- [x] VdoCipher video player integration & sticky preview card
- [x] Synthesized Course Detail UI (Udemy sticky card, Coursera header, Reference 3 vertical timeline & skills grid)
- [x] Quiz player & automated scoring
- [x] Automated verifiable certificate generation & QR verification

### Phase 3: Government Schemes & Resource Hub (In Progress)
- [x] Government Scheme search & multi-filter UI
- [x] Scheme detail modal with eligibility checklist & application links
- [ ] Startup Resource repository and template download center

### Phase 4: Market Linkages & Partner Leads
- [ ] Market partner showcase directory
- [ ] Lead submission & inquiry workflow
- [ ] Admin approval & lead status tracking

### Phase 5: Course Metadata Enrichment, Enrollment Flow & Progress Tracking (Complete)
- [x] Schema, DTOs & Seed Data sync for `about`, `outcomes`, `skills`, `tools`
- [x] Course Detail UI dynamic binding (`#about`, `#outcomes`, `#skills` sections)
- [x] Interactive "Enroll Now" client flow, registration routing & auto-enrollment
- [x] Interactive lesson completion & progress sync via `/api/progress`

### Phase 6: Dedicated Learning Experience, Enrolled Hub & LinkedIn-Style Quiz (Complete)
- [x] Refactor public course details page to clean overview with "Resume" routing
- [x] Enrolled Courses student dashboard (`/dashboard/courses`)
- [x] Enrolled Learning Path Hub replicating Reference Images 1 & 2 (`/dashboard/courses/[slug]`)
- [x] Fullscreen Dedicated Video Lecture Player replicating Reference Images 3 & 4 (`/courses/[slug]/learn`)
- [x] Interactive Chapter Quiz Player with Correct/Incorrect explanations replicating Reference Image 5 (`<InteractiveQuizView />`)

