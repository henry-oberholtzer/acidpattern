from django.http import Http404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from patterns.permissions import IsOwnerOrReadOnly
from patterns.models import Pattern
from patterns.serializers import PatternSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def api_root(request, format=None):
  return Response({
    'patterns': reverse('pattern-list', request=request, format=format),
    'users': reverse('user-list', request=request, format=format),
  })

# Create your views here.
class PatternList(ListCreateAPIView):
  """
  Lists all acidpatterns, or create a new acidpattern.
  """
  permission_classes = [IsAuthenticatedOrReadOnly]
  serializer_class = PatternSerializer
  queryset=Pattern.objects.all().order_by('date')
  def perform_create(self, serializer: PatternSerializer):
    serializer.save(author=self.request.user)

class PatternDetail(RetrieveUpdateDestroyAPIView):
  """
  Retrieve, update or delete an acidpattern.
  """
  permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
  serializer_class = PatternSerializer
  queryset=Pattern.objects.all()
