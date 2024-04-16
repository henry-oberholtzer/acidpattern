from rest_framework import permissions
from patterns.models import Pattern

class IsOwnerOrReadOnly(permissions.BasePermission):
  """
  Custom permission to only allow authors of a pattern to edit it.
  """
  def has_object_permission(self, request, view, obj: Pattern):
    if request.method in permissions.SAFE_METHODS:
      return True
    return obj.author == request.user
