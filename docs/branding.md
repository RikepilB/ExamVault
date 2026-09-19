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

## September 2026 landing and account-flow revision

Audience remains university instructors and course teams. The primary action is to create an instructor account; the secondary action is to inspect a real exam creation workflow before signing up. The public Vercel URL currently redirects anonymous visitors to Vercel login, so a passing local render is not public acceptance.

The Graded Paper identity stays: cream ruled paper, ink, marker red, Fraunces and IBM Plex, and the OMR motif. The landing hero will lead with the task: turn a question bank into distinct printable variants and results. Remove unsupported urgency and decorative pseudo-metrics. Use the repository's existing wizard screenshots as labeled product proof below the first fold. Keep the hero answer sheet as an illustration, with sample labels rather than claims about output count.

Sign-in and registration should read like the same product: a compact paper introduction beside the form on desktop, then a one-column flow on mobile. Forms use the same light inputs, labels, inline errors, disabled states and visible keyboard focus. Registration's long password guidance stays accessible and the scroll container must reach every control at 320px and 200% zoom. No auth logic or backend contracts change.

Verification: local desktop/mobile and narrow-height browser review, keyboard path, form validation feedback, reduced-motion state, no horizontal overflow, frontend lint/build and relevant tests. Production requires the actual domain to stop redirecting to Vercel login, followed by anonymous navigation through landing, sign-in and sign-up. The deployment runbook's manual alias must be checked after deploy.

### Rendered review and launch audit

Pass for the scoped visual work: at 1440px the hero names the instructor task, pairs one clear registration action with a real-screen workflow preview, and keeps the existing paper/OMR identity. Sign-in and registration use one shared layout. At 390px the form appears first; at 320px the registration page has no horizontal overflow, the submit control remains reachable, and the wordmark receives visible keyboard focus. The workflow anchor and both repository screenshots load. Inline registration errors are linked to their inputs. The answer-sheet art is explicitly labeled as a sample, not a production metric. No real account was created in this visual review.

Launch audit: the favicon and page description exist; the support route and privacy-policy route exist in code. A canonical URL, social image metadata, and robots file were not added in this UI-only pass. Signup has server-side rate limiting; no captcha is present. Privacy/legal copy needs owner review before treating it as a real-world policy. Deployment and alias recovery are documented in `docs/VERCEL_DEPLOY.md`. Anonymous access on the actual URL remains a required production check because Vercel SSO currently protects all non-custom domains.
