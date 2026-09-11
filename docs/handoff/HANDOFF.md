# Examvault â€” Handoff (father)

**Read this first.** Whole-project handoff. Freshest state on top, then an append-only
index of every session folder. Nothing here is ever deleted â€” full prose lives in each
session's own `HANDOFF.md`; this file is the map.

## How this works (tree of context)

```
docs/handoff/
  HANDOFF.md                  â† this file (father): rolling current state + session index
  .current-session            â† pointer: active session folder name (used by the hooks)
  _meta/TEMPLATE.md           â† per-session template
  <YYYY-MM-DD>-<name>/        â† one immutable folder per session
    HANDOFF.md                â† session digest: goal Â· done Â· files Â· failed Â· next
    transcript.md             â† optional full /export archive
```

**Rules:** append, never overwrite. Only the father's `## Current state` is replaced each
session. Solved tasks → one concrete one-liner (file / PR / command).

---

## Current state — 2026-09-11 (live, complete)

**ExamVault is LIVE and fully working at https://exam-vault-five.vercel.app** —
one Vercel project serves the SPA + Django API same-origin; Neon Postgres
(`examvault-db`) migrated + seeded (admin admin@examvault.dev + instructor
richard@examvault.dev; passwords handed to Richard 2026-09-11, not stored in
repo). All 7 live acceptance checks passed incl. a write; /api/health/ reports
all six services database-connected. Redeploy loop: `scripts/build-vercel-bundle.sh`
-> collectstatic -> `vercel deploy --prod` -> `vercel alias set <url>
exam-vault-five.vercel.app` (the public domain is a MANUAL alias — it does not
follow new prod deploys). CI green (run 34600901021). Both GitHub issues closed
(#1 orphan env deleted; #2 CI repaired incl. 65 unmasked test failures). Deploy
runbook: `docs/VERCEL_DEPLOY.md`. Session details:
`docs/handoff/2026-09-11-vercel-live-and-ci-repair/HANDOFF.md`.

## Current state — 2026-09-11 (redesign live; ONE dashboard toggle pending)

UI redesigned with **"The Graded Paper"** identity (cream/ink/marker-red,
Fraunces + IBM Plex, OMR-bubble motif): landing, login, signup, favicon,
branding.md — deployed as m9odpfx4x, CI green (run 34637938072).
**Domain saga root cause found:** (1) a dead duplicate project `exam-vault`
was git-connected to the repo — every push auto-deployed an empty build that
stole exam-vault-five.vercel.app (deleted 2026-09-11, fix script
`scripts/fix-prod-domain.sh`); (2) remaining blocker: project has **Vercel
Authentication (SSO)** ON — anonymous visitors get 302 to vercel.com/sso.
Fix is dashboard-only: Project exam-vault-five → Settings → Domains →
Vercel Authentication → Disabled (or add a custom domain, which is exempt).
Richard must click it — no CLI/API path with current creds.

## Previous state â€” 2026-07-08

Repo made AI-native (`project-scaffold`, 59 files) AND deep knowledge transfer **complete**.
Three root deliverables written: `PROJECT.md` (253 lines, architecture), `GAPS.md` (437 lines,
severity-ordered audit â€” 8 Critical / 8 High / 9 Medium / 6 Low, each with file:line + scoped
fix), root `CLAUDE.md` (131 lines, operational). Codebase = ExamVault, ex-UBCO-capstone
Django 4.2 + React 19 exam-management platform, hardened for portfolio deploy (live = Vercel +
Render + Neon; Railway prepared-not-live). Phase-0 baseline for future clean-vibe work:
frontend vitest 133 fail / 255 pass (pre-existing, `localStorage.clear` jsdom gap); docker
daemon down so backend suite not run locally. Top criticals: C1 similarity detector always
throws (list-vs-dict), C2 variant randomization clobbered, C3/C4/C5 IDOR + unenforced exam
access-level. Nothing committed â€” all new files untracked on `main`.

---

## Session index (append-only, newest first)

- **2026-09-11 — [vercel-live-and-ci-repair](2026-09-11-vercel-live-and-ci-repair/HANDOFF.md)** — ExamVault LIVE (SPA+API one Vercel project, Neon), CI green, issues #1+#2 closed

- **2026-07-08 â€” [scaffold-and-knowledge-transfer](2026-07-08-scaffold-and-knowledge-transfer/HANDOFF.md)** â€” scaffolded AI-native structure (59 files); mapped 601-file repo; launched 5 explore agents; PROJECT.md/GAPS.md/CLAUDE.md pending

<!-- compact-handoff:auto-snapshot -->
<!-- Latest auto-snapshot: docs/handoff/2026-07-08-scaffold-and-knowledge-transfer/snapshot-144350.md -->
## Latest auto snapshot â€” 2026-07-08T14:43:50.605Z
- Session folder: `docs/handoff/2026-07-08-scaffold-and-knowledge-transfer/`
- Snapshot file: `docs/handoff/2026-07-08-scaffold-and-knowledge-transfer/snapshot-144350.md`
- Branch: main

## Session index

- 2026-07-18 13:44 - Codex export 019f64cf-b6da-72c2-91e4-0e46c0c5b571: [2026-07-18-codex-019f64cfb6da](2026-07-18-codex-019f64cfb6da/HANDOFF.md). Archivo de contexto; no reemplaza Current state.
