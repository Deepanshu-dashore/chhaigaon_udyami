# UAT Verification Report: Phase 2 — Homepage UI & Core Learning Platform

## Phase Information
- **Phase**: Phase 2 — Homepage Restructure (IBM SkillsBuild Aesthetic) & Core Experience
- **Date**: 2026-09-12
- **Status**: IN PROGRESS / VERIFICATION ACTIVE

---

## Test Cases & Verification Items

### Test Case 1: Homepage Visual Rhythm & Hero Section
- **URL**: `http://localhost:3000/`
- **Objective**: Verify that the homepage renders the clean IBM SkillsBuild layout with government badge, bold typography, and interactive "Active Track" preview card on the right.
- **Criteria**:
  - [ ] Hero headline and subtitle render clearly in Devanagari Hindi.
  - [ ] Action buttons ("निःशुल्क सीखना शुरू करें", "सब्सिडी योजनाएं देखें") are clickable and route properly.
  - [ ] Active Certified Track card displays the 3-step timeline.

### Test Case 2: Platform Metric Ticker Bar
- **URL**: `http://localhost:3000/`
- **Objective**: Verify the 4-column metric bar below the Hero section.
- **Criteria**:
  - [ ] Displays 5,000+ उद्यमी, ₹2.5 Cr+ सब्सिडी, 100% सत्यापित योजनाएं, QR Verified डिजिटल सर्टिफिकेट.
  - [ ] Responsive alignment on both desktop and mobile viewports.

### Test Case 3: Course Cards & Metadata
- **URL**: `http://localhost:3000/#courses`
- **Objective**: Verify the course cards display correct levels, tags, lectures, pricing, and action buttons.
- **Criteria**:
  - [ ] Cards show Category chip, Level pill, "सर्टिफाइड" badge, and Lecture count.
  - [ ] Free courses display "निःशुल्क (Free)", paid courses show discount percentages.
  - [ ] "कोर्स देखें" button navigates to course detail page.

### Test Case 4: Government Schemes & Subsidy Explorer
- **URL**: `http://localhost:3000/#schemes`
- **Objective**: Verify PMEGP, Mudra, Mukhyamantri Udyami, and PM FME comparison cards.
- **Criteria**:
  - [ ] Subsidy percentage indicators (15% - 35%) and loan limits display properly.
  - [ ] "पात्रता चेक करें" action buttons present on each card.

### Test Case 5: Verifiable Digital Credentials Preview
- **URL**: `http://localhost:3000/`
- **Objective**: Verify the high-contrast dark certificate credentials showcase.
- **Criteria**:
  - [ ] Certificate preview graphic with QR code mockup renders crisply.
  - [ ] 4-point verification benefits checklist displays.
