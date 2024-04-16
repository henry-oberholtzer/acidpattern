from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from patterns.models import Pattern
from patterns.serializers import PatternSerializer

# Create your views here.
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticatedOrReadOnly])
def pattern_list(request):
  """
  Lists all acidpatterns, or create a new acidpattern.
  """
  if request.method == 'GET':
    patterns = Pattern.objects.all()
    serializer = PatternSerializer(patterns, many=True)
    return Response(serializer.data)
  
  elif request.method == 'POST':
    serializer = PatternSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticatedOrReadOnly])
def pattern_detail(request, pk):
  """
  Retrieve, update or delete an acidpattern.
  """
  try:
    pattern = Pattern.objects.get(pk=pk)
  except Pattern.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  
  if request.method == 'GET':
    serializer = PatternSerializer(pattern)
    return Response(serializer.data)
  
  elif request.method == 'PUT':
    serializer = PatternSerializer(pattern, request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  elif request.method == 'DELETE':
    pattern.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
