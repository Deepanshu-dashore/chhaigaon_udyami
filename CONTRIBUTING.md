# Contributing to Chhaigaon Udyami

Thank you for your interest in contributing to **Chhaigaon Udyami** (ग्रामीण उद्यमिता एवं कौशल विकास मंच)! We welcome contributions from developers, designers, content managers, and educators aiming to empower rural entrepreneurship and skill development.

---

## 📜 Table of Contents
1. [Code of Conduct](#-code-of-conduct)
2. [How to Contribute](#-how-to-contribute)
3. [Local Development Setup](#-local-development-setup)
4. [Branch Strategy & Commit Conventions](#-branch-strategy--commit-conventions)
5. [Pull Request Process](#-pull-request-process)
6. [Coding Guidelines & Standards](#-coding-guidelines--standards)

---

## 🤝 Code of Conduct
Please review and follow our [Code of Conduct](CODE_OF_CONDUCT.md) in all community interactions, issues, and pull requests.

---

## 💡 How to Contribute

- **Report Bugs:** Open a [GitHub Issue](https://github.com/Deepanshu-dashore/chhaigaon_udyami/issues/new?template=bug_report.md) with details, reproduction steps, and expected behavior.
- **Suggest Features:** Submit a [Feature Request](https://github.com/Deepanshu-dashore/chhaigaon_udyami/issues/new?template=feature_request.md) describing the user story and benefit to rural entrepreneurs.
- **Code & Fixes:** Pick an unassigned issue, comment to declare interest, fork/branch, and submit a Pull Request.

---

## 🛠 Local Development Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Deepanshu-dashore/chhaigaon_udyami.git
   cd chhaigaon_udyami
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Copy `.env.example` to `.env` and fill in your Supabase & PostgreSQL credentials:
   ```bash
   cp .env.example .env
   ```

4. **Database Setup (Prisma):**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. **Start Dev Server:**
   ```bash
   npm run dev
   ```

---

## 🌿 Branch Strategy & Commit Conventions

### Branch Naming
- `feature/feature-name` — for new user stories/features
- `fix/bug-description` — for bug fixes
- `docs/topic-name` — for documentation changes
- `refactor/component-name` — for refactoring existing code

### Conventional Commits
Please use [Conventional Commits](https://www.conventionalcommits.org/):
- `feat(schemes): add department filter for government schemes`
- `fix(auth): resolve session refresh cookie issue`
- `docs(readme): add database architecture visual diagram`
- `style(ui): update primary brand colors to emerald-600`
- `refactor(courses): simplify quiz submission payload`

---

## 🔀 Pull Request Process

1. Ensure all code compiles cleanly with `npm run build` without TypeScript errors.
2. Run ESLint checks: `npm run lint`.
3. Fill out the PR template completely with details of what was changed and screenshots if UI changes were made.
4. Request a review from the maintainers.

---

## 🎨 Coding Guidelines & Standards

- **Next.js App Router & React 19:** Use Server Components by default; declare `'use client'` only when state or DOM events are required.
- **Tailwind CSS v4:** Utilize project custom utilities and CSS variable tokens defined in `app/globals.css`.
- **Accessibility & i18n:** Support Hindi text and responsive viewports for mobile-first rural users.
- **Prisma Schema:** Always run `npx prisma generate` after modifying `prisma/schema.prisma`.

Thank you for building tools for rural empowerment! 🌾🚀
