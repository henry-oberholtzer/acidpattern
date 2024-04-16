from django.http import Http404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
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
class PatternList(APIView):
  """
  Lists all acidpatterns, or create a new acidpattern.
  """
  permission_classes = [IsAuthenticatedOrReadOnly]
  
  def get(self, request, format=None):
    patterns = Pattern.objects.all()
    serializer = PatternSerializer(patterns, many=True)
    return Response(serializer.data)
  
  def post(self, request, format=None):
    serializer = PatternSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  def perform_create(self, serializer: PatternSerializer):
    serializer.save(author=self.request.user)

class PatternDetail(APIView):
  """
  Retrieve, update or delete an acidpattern.
  """
  permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
  
  def get_object(self, pk):
    try:
      pattern = Pattern.objects.get(pk=pk)
    except Pattern.DoesNotExist:
      raise Http404
    
  def get(self, request, pk, format=None):
    pattern = self.get_object(pk)
    serializer = PatternSerializer(pattern)
    return Response(serializer.data)
  
  def put(self, request, pk, format=None):
    pattern = self.get_object(pk)
    serializer = PatternSerializer(pattern, request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  def delete(self, request, pk, format=None):
    pattern = self.get_object(pk)
    pattern.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
