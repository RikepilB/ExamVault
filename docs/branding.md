# Branding

> Name, voice, audience, visual identity. An agent writing copy, error
> messages, or marketing pages reads this to stay on-brand.

## Name & tagline

**ExamVault** — "Every exam, engineered."

The name says what it does: exams are vaulted once (question banks) and
redeployed (variants) instead of rewritten each term.

## Audience

University instructors and course teams who write exams in multiple variants
and grade at scale. Secondary: department admins overseeing courses and
instructors.

## Voice & tone

Precise, calm, quietly confident. Reads like a well-written exam rubric:
short declarative sentences, no hype, technical terms only when they name real
artifacts (variant, OMR, question bank). Never uses exclamation marks in
marketing copy.

Example: "Write questions once; let the machine handle the paperwork."

## Visual identity

Direction: **"The Graded Paper"** — the product's native artifacts (exam
paper, OMR answer sheet, grading pen) become the interface language.

- **Paper** `#F7F2E7` (cream, faint ruled lines + red margin in hero)
- **Ink** `#1B2431` (blue-black text and borders)
- **Marker** `#C1121F` (grading-pen red — the single action color)
- **Correct** `#1E7E34` (used sparingly, e.g. the correct-answer bubble)
- Type: **Fraunces** (display serif) · **IBM Plex Sans** (body) ·
  **IBM Plex Mono** (machine labels, question numbers, OMR strips)
- Motif: the OMR answer bubble — marked/unmarked bubbles as list markers,
  accents, and the favicon; buttons use offset hard shadows (print feel).
- Logo: wordmark "ExamVault**.**" (red period). No pictorial logo yet.
- Favicon: `app/frontend/public/favicon.svg` (marked bubble on paper).

Dark app interior keeps its own slate token system (`tailwind.config.ts`) —
the paper identity governs the public surfaces (landing, sign-in, sign-up).

## Problem & solution (one paragraph each)

**Problem.** Writing a fair multi-variant exam is manual work: instructors
retype questions, hand-shuffle versions, format papers and answer sheets, then
re-key results into a spreadsheet before any analysis can happen.

**Solution.** ExamVault keeps questions in per-course banks, generates unique
exam variants with matching answer keys, exports print-ready PDF/DOCX with
OMR-scannable answer sheets, and ingests scanned results straight into
analytics — one graded workflow instead of four disconnected tools.
