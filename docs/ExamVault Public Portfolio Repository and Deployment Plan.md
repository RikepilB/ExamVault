# Problem statement
Create a public, portfolio-safe version of a currently private team project, deploy it with minimal maintenance, and keep only non-sensitive/demo-ready functionality exposed.
## Current state summary
The project is a full-stack app with a React + Vite frontend and a Django + DRF backend, currently orchestrated with Docker Compose plus Nginx and PostgreSQL. This is not a static-only site, so GitHub Pages alone cannot host the full product. The backend currently contains development-oriented settings (for example broad hosts/CORS and a hardcoded secret key) that must be corrected before any public deployment.
## Proposed approach
Use a dedicated public showcase repository (not a direct mirror) and publish a scoped demo version.
* Create a new public repo that contains only portfolio-safe code, docs, and assets, excluding secrets, internal-only data, and sensitive history.
* Perform a pre-publication review: remove credentials/default credentials from docs, harden production settings, and verify `.env.example` is safe.
* Define one low-maintenance deployment target as primary:
    * Primary recommendation: Vercel (frontend) + managed Python host for Django API + Supabase Postgres.
    * Secondary fallback: Docker deployment on a single host (if you want minimal code changes from current architecture).
    * Avoid GitHub Pages for the full app (acceptable only for a static landing page that links to the live app).
* Add clear environment separation (dev vs prod), production CORS/ALLOWED_HOSTS, secure secret management, and deployment-specific API base URL wiring.
* Add minimal operational guardrails for “leave it running”: uptime checks, basic error logging, and a rollback note in README.
## Execution outline
Phase 1: Public-repo preparation
* Create the new public repository and import only curated branches/files.
* Sanitize repository content and documentation for public visibility.
* Add portfolio-focused README (features, architecture, demo link, screenshots, boundaries).
Phase 2: Production hardening
* Split settings into production-safe configuration and environment variables.
* Configure database + migration flow for managed Postgres.
* Ensure static/media handling and CORS/auth settings match deployed domains.
Phase 3: Deployment
* Deploy frontend on Vercel with production API URL.
* Deploy Django backend on chosen Python host and connect to Supabase Postgres.
* Run smoke tests (auth, key workflows, exports/analytics, health endpoint).
Phase 4: Long-term low-maintenance state
* Freeze scope for portfolio demo, document known limitations, and keep only security/dependency updates.
* Add a lightweight maintenance policy in README (owner contact, update cadence, incident fallback).
## Decision guidance for your two options
Vercel + Supabase is the best fit for a modern portfolio if you still need a live full-stack demo. GitHub Pages is only appropriate if you intentionally publish a static showcase page instead of the working Django-backed product.