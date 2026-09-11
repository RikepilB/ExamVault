"""Shared helpers for course-related tests."""

from courses.models import CourseInstructor


def add_accepted_instructor(course, user, role=CourseInstructor.Role.MAIN):
    """Link `user` to `course` as an accepted instructor.

    The API's permission checks (see questions.permissions.instructor_course_ids
    and the course views) only recognize CourseInstructor rows with
    accepted=True — the legacy `course.instructors` M2M alias is not enough.
    """
    return CourseInstructor.objects.create(
        course=course,
        user=user,
        role=role,
        access=CourseInstructor.Access.FULL,
        accepted=True,
    )
