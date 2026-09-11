import requests
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


class GlobalHealthCheckView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    SERVICE_PATHS = {
        "users": "/api/auth/health/",
        "courses": "/api/courses/health/",
        "exams": "/api/exams/health/",
        "questions": "/api/questions/health/",
        "analytics": "/api/analytics/health/",
        "results": "/api/results/health/",
    }

    def get(self, request):
        # Probe each service through this request's own host so the check works
        # everywhere (docker-compose, Render, serverless) instead of assuming
        # the compose-internal "http://backend:8000" hostname.
        base = f"{'https' if request.is_secure() else 'http'}://{request.get_host()}"
        health_data = {}

        for name, path in self.SERVICE_PATHS.items():
            try:
                r = requests.get(f"{base}{path}", timeout=5)
                if r.status_code == 200:
                    # store full JSON:
                    # {"status":"ok","service":...,"database":...}
                    health_data[name] = r.json()
                else:
                    health_data[name] = {"status": "error", "database": "unknown"}
            except requests.RequestException:
                health_data[name] = {"status": "unreachable", "database": "unknown"}

        return Response({"status": "ok", "services": health_data})
