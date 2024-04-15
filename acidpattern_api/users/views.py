from django.shortcuts import render
from rest_framework import permissions, generics
from users.models import User
from users.serializers import UserSerializer

from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope

class UserList(generics.ListCreateAPIView):
  permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
  queryset = User.objects.all()
  serializer_class = UserSerializer

class UserDetails(generics.RetrieveAPIView):
  permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
  queryset = User.objects.all()
  serializer_class = UserSerializer
