"""Vercel serverless entrypoint for the Django backend.

The deploy bundle (assembled by `scripts/build-vercel-bundle.sh`) copies the
Django project into `backend/` next to this file. The Python runtime only
bundles the `api/` directory plus its dependencies, so we add the backend to
`sys.path` before Django imports anything.
"""

import os
import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent.parent / "backend"
sys.path.insert(0, str(BACKEND_DIR))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "examvault.settings")

from django.core.wsgi import get_wsgi_application  # noqa: E402

app = get_wsgi_application()
