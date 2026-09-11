from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    ExamExportHistoryViewSet,
    ExamViewSet,
    ExamsHealthCheckView,
    VariantViewSet,
    admin_create_template,
    admin_delete_template,
    admin_set_default_template,
    admin_templates_list,
    admin_update_template,
    template_layout_api,
    template_layout_detail_api,
)

router = DefaultRouter()
router.register(r"export_history", ExamExportHistoryViewSet, basename="export_history")
router.register(r"variants", VariantViewSet, basename="variant")
router.register(r"", ExamViewSet, basename="exam")


urlpatterns = [
    # Health check must precede the router so "health/" isn't matched as an
    # exam pk by the catch-all `r""` registration.
    path("health/", ExamsHealthCheckView.as_view(), name="exams-health"),
    path("", include(router.urls)),
    # Template endpoints
    path("templates/layout/", template_layout_api, name="template-layout"),
    path(
        "templates/layout/<int:template_id>/",
        template_layout_detail_api,
        name="template-layout-detail",
    ),
    # Admin template management
    path("admin/templates/", admin_templates_list, name="admin_templates_list"),
    path(
        "admin/templates/create/", admin_create_template, name="admin_create_template"
    ),
    path(
        "admin/templates/<int:template_id>/update/",
        admin_update_template,
        name="admin_update_template",
    ),
    path(
        "admin/templates/<int:template_id>/delete/",
        admin_delete_template,
        name="admin_delete_template",
    ),
    path(
        "admin/templates/<int:template_id>/set-default/",
        admin_set_default_template,
        name="admin_set_default_template",
    ),
]
