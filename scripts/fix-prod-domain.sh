#!/usr/bin/env bash
# Re-point the public production domain at the latest production deployment.
#
# Why this exists: the `exam-vault-five.vercel.app` production domain on this
# project occasionally unbinds after deploys (Vercel-side reconciliation quirk;
# symptom: home returns 404 with X-Vercel-Error: NOT_FOUND even though the
# deployment is Ready and target=production). Re-setting the alias fixes it
# every time. Run this whenever the site 404s, or just after deploying.
set -euo pipefail

cd "$(dirname "$0")/../deploy-vercel"

LATEST=$(vercel ls exam-vault-five 2>/dev/null | grep -oE "https://exam-vault-five-[a-z0-9]+-rikepilbs-projects\.vercel\.app" | head -1)
if [ -z "$LATEST" ]; then
  echo "Could not find latest deployment." >&2
  exit 1
fi
echo "Latest production deployment: $LATEST"
vercel alias set "$LATEST" exam-vault-five.vercel.app
echo "Done — https://exam-vault-five.vercel.app now serves $LATEST"
