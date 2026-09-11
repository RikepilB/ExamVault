# Vercel Deployment (full stack: React SPA + Django API)

The production deployment serves **both** the frontend and the backend from one
Vercel project (`exam-vault-five`), so the SPA and the API are same-origin and
no CORS configuration is load-bearing.

- **URL**: https://exam-vault-five.vercel.app
- **Frontend**: static SPA build (`app/frontend` → `dist/`), served by Vercel's CDN
- **Backend**: Django served as a Python serverless function (`/api/index.py`)
- **Database**: Neon Postgres, provisioned through the Vercel Marketplace and
  connected to the project as `DATABASE_URL`

## Layout

```
deploy-vercel/
  api/index.py            WSGI entrypoint — puts backend/ on sys.path, boots Django
  api/requirements.txt    trimmed runtime deps (no gunicorn/weasyprint/dev tools)
  vercel.json             /api/*, /admin/*, /static/* → function; everything else → SPA
  backend/                (generated) copy of app/backend
  public/                 (generated) copy of app/frontend/dist
```

`scripts/build-vercel-bundle.sh` assembles the generated parts. The `api/` files
and `vercel.json` are committed; the copies are not.

## Deploy steps

```bash
# 1. Build the frontend
cd app/frontend && npm run build && cd ../..

# 2. Assemble the bundle
bash scripts/build-vercel-bundle.sh

# 3. Collect Django static files into the bundle (uses any venv with the
#    deploy-vercel/api/requirements.txt deps installed)
cd deploy-vercel/backend
SECRET_KEY=collectstatic-placeholder python manage.py collectstatic --noinput
cd ../..

# 4. Deploy to production (deploy-vercel/ is linked to project exam-vault-five)
cd deploy-vercel
vercel deploy --prod
```

## Environment variables (Vercel project settings)

| Variable | Value |
|---|---|
| `SECRET_KEY` | strong random secret |
| `DEBUG` | `False` |
| `ALLOWED_HOSTS` | `exam-vault-five.vercel.app,.vercel.app` |
| `CSRF_TRUSTED_ORIGINS` | `https://exam-vault-five.vercel.app` |
| `CORS_ALLOWED_ORIGINS` | `https://exam-vault-five.vercel.app` |
| `FRONTEND_URL` | `https://exam-vault-five.vercel.app` |
| `EMAIL_BACKEND` | `django.core.mail.backends.console.EmailBackend` |
| `DB_SSL_REQUIRED` | `True` |
| `DATABASE_URL` | Neon pooled connection string (injected by the Neon integration) |
| `VITE_API_BASE_URL` | empty — the SPA uses same-origin `/api` |

## Migrations & seeding

Run against the production database from a machine with the backend deps
installed (they tunnel over the pooled Postgres connection; nothing runs on the
server):

```bash
DATABASE_URL="postgresql://...?sslmode=require" python manage.py migrate
```

## Notes / gotchas

- **WeasyPrint is not deployed**: it needs native pango/cairo libraries that the
  Vercel Python runtime doesn't ship, and nothing in the codebase imports it.
- **`VITE_API_BASE_URL` stays empty**: `src/api/axiosInstance.ts` falls back to
  `/api`, which is correct for the same-origin deployment. A stale full-URL
  value would point the SPA at the wrong origin.
- The function `maxDuration` is 60s (exam variant generation can be slow).
- Uploads and generated files are ephemeral (serverless filesystem); the app
  only writes media to `/tmp`-style scratch space, which is fine for its
  process-in-request workflows.
