# Chhaigaon Udyami — Technical Progress & Roadmap Audit

**Last Updated:** September 30, 2026  
**Status:** Core Foundation & Services Completed | Active Phase: Forms, Manage Pages & Galleries

---

## 1. Implemented Database Models (Prisma ORM)

| Model Category | Prisma Models Implemented | Description & Status |
| :--- | :--- | :--- |
| **User & Profile** | `User`, `UserProfile`, `UserActivityLog` | Roles (`SUPER_ADMIN`, `ADMIN`, `CONTENT_MANAGER`, `TRAINER`, `STUDENT`, `MENTOR`, `MARKET_PARTNER`), status tracking, verification, session logs. |
| **Course & Modules** | `Course`, `CourseModule`, `Lesson` | Modular curriculum tree, pricing, level, duration, draft/published statuses. |
| **Media & Assets** | `Video`, `Material` | VdoCipher video streaming integration metadata, downloadable PDF workbooks/files. |
| **Enrollments & Progress** | `Enrollment`, `LessonProgress` | Course subscriptions, real-time video position saving (`lastPosition`, `watchedSeconds`, `progressPercent`). |
| **Payments (Razorpay)** | `Order`, `Payment` | Order creation (`razorpayOrderId`), payment verification (`razorpayPaymentId`, `razorpaySignature`). |
| **Quiz & Evaluation** | `Quiz`, `Question`, `QuestionOption`, `QuizAttempt`, `QuizAnswer` | Quizzes with time limits, passing scores, user attempts, and automated grading. |
| **Verification & Certificates** | `Certificate` | Unique certificate numbers, 24x7 QR code verification links (`verificationCode`). |
| **Government & Market** | `GovernmentScheme`, `StartupResource`, `MarketPartner`, `MarketLead`, `Notification` | Subsidy directory, startup toolkits, B2B partner leads, and user notifications. |

---

## 2. Implemented Backend Services

| Service File | Responsibilities | Status |
| :--- | :--- | :--- |
| [`services/course.service.ts`](file:///e:/Repository/chhaigaon_udyami/chhaigaon_udyami/services/course.service.ts) | Fetching public & user courses, modules, lessons, slug routing, admin course CRUD. | ✅ Completed |
| [`services/enrollment.service.ts`](file:///e:/Repository/chhaigaon_udyami/chhaigaon_udyami/services/enrollment.service.ts) | User enrollment lifecycle, access verification, completion status. | ✅ Completed |
| [`services/lesson-progress.service.ts`](file:///e:/Repository/chhaigaon_udyami/chhaigaon_udyami/services/lesson-progress.service.ts) | Real-time video position updates, lesson completion marks, course progress % calculation. | ✅ Completed |
| [`services/lesson.service.ts`](file:///e:/Repository/chhaigaon_udyami/chhaigaon_udyami/services/lesson.service.ts) | Lesson details, VdoCipher playback tokens/credentials, downloadable material links. | ✅ Completed |
| [`services/payment.service.ts`](file:///e:/Repository/chhaigaon_udyami/chhaigaon_udyami/services/payment.service.ts) | Razorpay order generation, HMAC SHA256 signature verification, auto-enrollment on payment success. | ✅ Completed |
| [`services/scheme.service.ts`](file:///e:/Repository/chhaigaon_udyami/chhaigaon_udyami/services/scheme.service.ts) | Government scheme retrieval and subsidy eligibility filters. | ✅ Completed |
| [`services/user-profile.service.ts`](file:///e:/Repository/chhaigaon_udyami/chhaigaon_udyami/services/user-profile.service.ts) | User profile updates, district/state data, business details management. | ✅ Completed |

---

## 3. Auth & Registration Status

- ✅ **Registration Flow (`/auth/register`, `/register`)**: Complete form with validation, Supabase SSR Auth user creation, and Prisma `User` + `UserProfile` synchronization.
- ✅ **Authentication Flow (`/auth/login`, `/login`, `/api/auth/*`)**: Email/mobile authentication, role-based session middleware, activity logging (`UserActivityLog`).
- ✅ **OAuth / Provider Auth (`/api/oauth/*`)**: Google OAuth setup ready.

---

## 4. Next Implementation Targets

### A. Interactive Forms (`forms`)
1. **Scheme Application & Subsidy Calculator Form (`/apply`, `/schemes/apply`)**:
   - Project cost input, subsidy category calculator (35% PMEGP / PM Mudra), step-by-step document upload checklist.
2. **Contact & Inquiry Form (`/contact`)**:
   - Business inquiry, DIC Khandwa guidance request, lead routing to `MarketLead`.
3. **Course Feedback & Review Form**:
   - Post-completion student reviews & rating form.

### B. Management Pages (`manage pages` / Admin & Creator Dashboards)
1. **Admin Course & Content Management (`/admin/courses`)**:
   - Course CRUD, module ordering, video upload & VdoCipher sync.
2. **Admin Government Scheme Management (`/admin/schemes`)**:
   - Add/edit scheme details, eligibility guidelines, subsidy percentages, application links.
3. **Admin User & Enrollment Management (`/admin/users`, `/admin/enrollments`)**:
   - User status toggle (ACTIVE/BLOCKED), manual enrollment provisioning, certificate issuance overrides.
4. **Market Partner Lead Management (`/admin/leads`)**:
   - Review user inquiries, assign leads to B2B market partners.

### C. Galleries & Visual Showcases (`galleries`)
1. **Enterprise Success Stories & Success Gallery (`/gallery`, `/stories`)**:
   - Visual showcase of local Chhaigaon Makhan & Khandwa entrepreneurs, video testimonials, before/after business growth cards.
2. **Verified Certificate Gallery (`/certificates`, `/gallery/certificates`)**:
   - Public verifiable certificate showcase gallery with QR preview.
3. **Photo & Field Workshop Gallery (`/gallery/workshops`)**:
   - Photo gallery of DIC Khandwa workshops, NABARD awareness camps, and hands-on agricultural training sessions.
