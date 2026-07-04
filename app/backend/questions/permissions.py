# questions/permissions.py
"""
Ownership-scoping helpers for QuestionBank / Question access.

Mirrors the pattern used by exams.views.ExamViewSet.get_queryset: a user may
only read/write a QuestionBank (and, transitively, its Questions) if they are
an accepted instructor on the course that owns it. Views should use these
helpers instead of calling Question.objects.get(...) / QuestionBank.objects
.get(...) directly, so that a bare numeric ID can never be used to reach
another instructor's question bank or answer keys.
"""

from courses.models import CourseInstructor


def instructor_course_ids(user):
    """Course IDs where `user` is an accepted instructor."""
    return CourseInstructor.objects.filter(
        user=user, accepted=True
    ).values_list("course_id", flat=True)


def is_course_instructor(user, course_id):
    """Whether `user` is an accepted instructor of the given course."""
    return CourseInstructor.objects.filter(
        user=user, course_id=course_id, accepted=True
    ).exists()
