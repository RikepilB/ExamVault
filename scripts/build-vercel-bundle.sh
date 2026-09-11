#!/usr/bin/env bash
# Assemble the deploy-vercel/ bundle that gets deployed with `vercel deploy`.
#
# Layout produced (see deploy-vercel/vercel.json for the routing that goes with it):
#   api/index.py            serverless WSGI entrypoint (committed, not generated)
#   api/requirements.txt    trimmed runtime deps (committed, not generated)
#   vercel.json             rewrites + function config (committed, not generated)
#   backend/                fresh copy of app/backend (generated)
#   public/                 fresh copy of app/frontend/dist (generated)
#
# Django's collectstatic output lives in backend/staticfiles and is created by
# running collectstatic against the bundle (see docs/VERCEL_DEPLOY.md).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/deploy-vercel"

rm -rf "$DEST/backend" "$DEST/public"
mkdir -p "$DEST"

# Backend source (no caches, env files, venvs, or stale collectstatic output).
cp -r "$ROOT/app/backend" "$DEST/backend"
find "$DEST/backend" -type d \( -name '__pycache__' -o -name '.venv*' -o -name 'staticfiles' -o -name 'logs' \) -exec rm -rf {} +
rm -f "$DEST/backend/.env"
# Not used by the serverless target (Vercel builds api/requirements.txt instead).
rm -f "$DEST/backend/requirements.txt" "$DEST/backend/Dockerfile" \
      "$DEST/backend/entrypoint.sh" "$DEST/backend/Procfile" "$DEST/backend/railway.json"

# Frontend SPA build output; must be built first: (cd app/frontend && npm run build).
cp -r "$ROOT/app/frontend/dist" "$DEST/public"

echo "Bundle assembled at $DEST"
