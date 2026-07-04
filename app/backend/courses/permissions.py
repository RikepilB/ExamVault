# courses/permissions.py
from rest_framework import permissions

from .models import CourseInstructor


class IsInstructorOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow instructors of a course to edit it.
    Works with the new CourseInstructor through model.
    """

    def has_permission(self, request, view):
        # Object-level membership is enforced in has_object_permission for
        # both reads and writes; here we only require authentication so
        # get_object() can run and raise its own 404/403 as appropriate.
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Both read and write access require the user to actually be an
        # accepted instructor on this specific course — otherwise any
        # authenticated user could GET a course they have no relationship to.
        return CourseInstructor.objects.filter(
            course=obj, user=request.user, accepted=True
        ).exists()
