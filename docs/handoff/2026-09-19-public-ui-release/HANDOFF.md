# Goal

Improve ExamVault's public hero and instructor account pages, and make the live demo usable anonymously.

## Current state

Complete. [PR #3](https://github.com/RikepilB/ExamVault/pull/3) merged at `dd0aee8`. The full-stack bundle was deployed as `dpl_E74K3cY1E42kcsGRWQB5hqojxidK`, and `exam-vault-five.vercel.app` was manually aliased to it. Vercel Authentication is `preview` only. Anonymous browser checks returned 200 for `/`, `/login`, `/signup`, and `/api/health/`; both product screenshots loaded. The API health response reported connected services. No production account was created for this verification.

## Files in flight

None. The original checkout has unrelated uncommitted work; this release used an isolated worktree. `deploy-vercel/backend` and `deploy-vercel/public` are generated, ignored bundle outputs.

## Changed

- `app/frontend/src/pages/Home.tsx`: task-led hero, accurate sample labels, real exam-builder screenshots, workflow anchor.
- `app/frontend/src/pages/Login.tsx`, `Signup.tsx`, `components/AuthPageLayout.tsx`, `App.tsx`: cohesive responsive account screens, semantic controls, focus states, autocomplete, connected error and password-criteria descriptions, no viewport overflow.
- `docs/branding.md`: brief, rendered review, launch audit. `docs/VERCEL_DEPLOY.md`: anonymous verification and preview-only protection setting.
- Local verification: frontend build, Prettier and targeted ESLint, 11 focused auth tests; hosted frontend/backend tests and style, Docker smoke, and Vercel passed. Browser checked desktop and 320px mobile, reduced motion, screenshots, form navigation, and health.

## Failed attempts

- The initial hosted frontend style job failed because the changed files were not Prettier formatted; fixed in `b7a1f03`.
- CodeRabbit found the password criteria were not programmatically tied to the input; fixed and browser-verified in `78353c5`.
- Anonymous visitors were redirected to Vercel SSO before the release. The project setting is now `preview`, preserving preview protection while opening production.

# Next steps

No release action remains. If future deployments change the alias, follow `docs/VERCEL_DEPLOY.md`. A real production signup/login transaction was not exercised; if needed, use a supervised test account without publishing credentials. Privacy-policy text and any captcha choice remain owner decisions, not part of this UI release.
