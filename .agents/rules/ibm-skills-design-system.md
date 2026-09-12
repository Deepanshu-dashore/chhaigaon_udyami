# IBM SkillsBuild Design System & UI Rules

This ruleset enforces the exact design patterns, typography, and card structures observed in the **IBM SkillsBuild** platform.

---

## 1. Color Palette (IBM Carbon Light)

- **Canvas Background**: `#ffffff` (Pure White) & `#f4f4f4` / `#f2f4f8` (Subtle Neutral Section Surface).
- **Primary Accent**: `#0f62fe` (IBM Blue 60) for active indicators, primary CTAs, and arrow links.
- **Primary Hover**: `#0043ce` (IBM Blue 70).
- **Success / Subsidies**: `#198038` (Carbon Green).
- **Text Color**: `#161616` (Primary Headings), `#525252` (Body Text / Subtitles), `#6f6f6f` (Metadata).
- **Borders**: `#e0e0e0` / `border-slate-200` (1px clean hairline borders, no heavy shadows).

---

## 2. Card Anatomy & Types

### Type A: Course & Credential Card (Image 1)
- Flat white surface with subtle `1px border-slate-200`.
- **Top Right Badge**: Digital credential ribbon icon (Blue badge with star).
- **Heading**: Bold, clean sans-serif title (2-line clamp).
- **Description**: 2-line summary in `#525252`.
- **Category Chips**: Soft gray rounded pill tags (`bg-slate-100 text-slate-700 text-xs px-2.5 py-1`).
- **Footer Metadata**: `Clock < 1 hour` + `BarChart Foundational` / Level.
- **Bottom Right CTA**: Sharp blue right arrow `->` or link.

### Type B: Scheme / Workshop Card (Image 2)
- Soft gray audience pill tags at top (`University students`, `Adult learners`, `ग्रामीण युवा`).
- Bold event/scheme title.
- Key-value metadata list (`Type: Virtual / Direct`, `Date: September 2026`, `Subsidy: 35%`, `Language: Hindi`).
- Bottom left blue text link (`Register ->` / `पात्रता देखें ->`).

---

## 3. Interactive Layout Patterns

### Vertical Sticky Section Navigator (Images 4 & 5)
- **Left Column**: Vertical tab list with active blue left-rail indicator bar (`| Start Learning`, `| Events`, `| Success stories`, `| FAQ`).
- **Right Column**: Dynamically synchronized content panel with photography, descriptions, and expandable accordion items.

---

## 4. Typography & Button Rules
- **Font**: `IBM Plex Sans`, `Inter`, `Noto Sans Devanagari`.
- **Buttons**:
  - Primary: Sharp solid blue (`bg-[#0f62fe] text-white hover:bg-[#0043ce] px-5 py-3 rounded-none sm:rounded-md flex items-center gap-2`).
  - Secondary: Outlined blue (`border-2 border-[#0f62fe] text-[#0f62fe] hover:bg-blue-50 px-5 py-3`).
- **Zero unnecessary heavy drop-shadows or gradients**: Rely on hairline borders, crisp typography, and generous whitespace.
