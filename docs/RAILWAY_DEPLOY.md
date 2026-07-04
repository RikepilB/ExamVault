# Railway Deployment Runbook (Backend)

This covers deploying `app/backend` (Django) to Railway. The frontend stays on Vercel and is out of scope here. This is code-level prep only — no Railway project has been created as part of writing this doc.

Proven reference: `render.yaml` at the repo root documents the working Render build/start commands. This runbook ports the same commands to Railway's conventions.

## 1. Environment variables checklist

Set these on the Railway service (Settings → Variables). Values mirror `render.yaml` / `.env.example` / `examvault/settings.py`.

| Variable | Value / notes |
|---|---|
| `SECRET_KEY` | Strong random secret. Railway can generate one, or reuse a generated value. |
| `DEBUG` | `False` |
| `ALLOWED_HOSTS` | Your Railway-issued domain (and custom domain if you add one), e.g. `your-app.up.railway.app` |
| `CORS_ALLOW_ALL_ORIGINS` | `False` |
| `CORS_ALLOWED_ORIGINS` | `https://exam-vault-five.vercel.app` (or current frontend URL) |
| `CSRF_TRUSTED_ORIGINS` | `https://exam-vault-five.vercel.app` (or current frontend URL) |
| `FRONTEND_URL` | Same frontend URL, used for links (e.g. email verification) |
| `DATABASE_URL` | Neon **pooled** connection string, `postgresql://...?sslmode=require` |
| `DB_SSL_REQUIRED` | `True` |
| `EMAIL_BACKEND` | `django.core.mail.backends.console.EmailBackend` unless real email is wanted (see below) |
| `SEED_SUPERUSER_ON_STARTUP` | `false` — see note in section 3 |

Only if real outbound email is wanted, also set: `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USE_TLS`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`, `DEFAULT_FROM_EMAIL`. Otherwise leave `EMAIL_BACKEND` on the console backend and skip these.

**Skip these** — `JWT_SECRET_KEY`, `JWT_ALGORITHM`, `JWT_ACCESS_TOKEN_LIFETIME`, `JWT_REFRESH_TOKEN_LIFETIME` appear in `.env.example` but per an earlier audit are not read anywhere in `examvault/settings.py`. `SIMPLE_JWT` is hardcoded there (`ACCESS_TOKEN_LIFETIME=30min`, `REFRESH_TOKEN_LIFETIME=1 day`), so these four env vars are dead weight — setting them has no effect.

## 2. Step-by-step

1. **Create a Railway project** → "Deploy from GitHub repo".
2. **Connect the repo**: `RikepilB/ExamVault`.
3. **Set the service Root Directory** to `app/backend` (Settings → Source → Root Directory). This is required — the repo is a monorepo and the backend isn't at the repo root.
4. **Set environment variables** from the checklist in section 1 (Settings → Variables).
5. **Builder**: Railway auto-detects Python from `runtime.txt` (`python-3.11.12`) and installs `requirements.txt`. No Dockerfile is used in this path (see section 3). No build command override is needed — Railway's default build (`pip install -r requirements.txt`) matches the proven Render build.
6. **Start command**: auto-detected from `app/backend/Procfile`:
   ```
   web: gunicorn examvault.wsgi:application --bind 0.0.0.0:$PORT
   ```
7. **Migrations before start**: `app/backend/railway.json` sets a Pre-Deploy Command (`python manage.py migrate`) that Railway runs after build and before the new instance starts serving traffic. See the convention note below for why this lives in `railway.json` and not in the Procfile.
8. **First deploy**: push/connect triggers a build → pre-deploy command runs migrations → gunicorn starts. Watch the deploy logs for the migrate step and the gunicorn boot line.
9. **Verify**: hit `/api/health/` on the Railway-issued domain, then confirm login and a basic exam/course flow.
10. **Config file path caveat**: Railway's Config-as-Code file does **not** automatically follow the Root Directory setting. If the dashboard doesn't pick up `app/backend/railway.json` automatically, set the Config File Path explicitly (Settings → Config-as-code) to `app/backend/railway.json`.

## 3. Railway-convention notes (verified, not assumed)

**Procfile `release:` vs `railway.json` `preDeployCommand` — this was explicitly checked, not just copied from Heroku convention.**

- Railway's build system has changed: **Railpack** is now Railway's default builder (Nixpacks is deprecated/maintenance-mode as of 2026). Railpack's documented Procfile support only recognizes `web`, `worker`, `scheduler`, `urgentWorker`, `api` as process types — it does **not** document a `release` process type.
- The older Nixpacks builder *did* support a Heroku-style `release:` Procfile line as a distinct phase run after build, before start. But relying on that is no longer safe as the default assumption for a new Railway project in 2026.
- Railway's actual current, officially documented mechanism for a pre-deploy/migrate step is the **Pre-Deploy Command** feature (`docs.railway.com/guides/pre-deploy-command`), configured via `deploy.preDeployCommand` in `railway.json`/`railway.toml`, or set directly in the dashboard (Settings → Deploy → Pre-Deploy Command). It must exit `0` to allow the deploy to proceed.
- **Adjustment made**: `app/backend/Procfile` only declares `web:` (reliable under both builders). The migrate step is declared in `app/backend/railway.json` via `preDeployCommand` instead of a Procfile `release:` line, per the verified current convention. If Railway's dashboard shows the service actually building with Nixpacks, a `release: python manage.py migrate` line in the Procfile would also work as a fallback — but `railway.json`'s `preDeployCommand` is the correct, builder-agnostic choice and is what's shipped here.

**Dockerfile / `entrypoint.sh` are not used in this deploy path.** `app/backend/Dockerfile` and `entrypoint.sh` exist for the Docker-based local/dev workflow (see `docker-compose.yml`). Railway, per steps 3–6 above, builds natively from `requirements.txt` + `runtime.txt` + `Procfile` — it does not build or run the Dockerfile unless the service is explicitly configured to deploy via Dockerfile. So whatever default `entrypoint.sh` uses for `SEED_SUPERUSER_ON_STARTUP` (someone else is adjusting that default separately) has **no effect** on a Railway deploy — the Railway service never executes `entrypoint.sh`. `SEED_SUPERUSER_ON_STARTUP` should still be explicitly set to `false` in Railway's env vars anyway: harmless if unused, and correct if this project is ever pointed at the Dockerfile-based path instead.

## 4. Database: Neon, not Supabase

Per the repo README (`README.md`, Deployment section), this app is documented to use **Neon** (serverless Postgres) — not Supabase. Confirmed by grepping the backend for Supabase-specific SDKs/features (auth, storage, realtime, edge functions): none are used. The app talks to Postgres purely via `DATABASE_URL` (parsed in `examvault/settings.py`) and standard Django ORM/psycopg2 — nothing ties it to a specific Postgres provider. Use Neon's **pooled** connection string (PgBouncer-backed, suited to Railway's app-server connection pattern) with `sslmode=require`, matching `DB_SSL_REQUIRED=True`.
