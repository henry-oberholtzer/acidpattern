from django.shortcuts import render
from rest_framework import permissions, generics
from users.models import User
from users.serializers import UserSerializer, GroupSerializer
from django.contrib.auth.models import Group

from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope

class UserList(generics.ListCreateAPIView):
  permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
  queryset = User.objects.all()
  serializer_class = UserSerializer

class UserDetails(generics.RetrieveAPIView):
  permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
  queryset = User.objects.all()
  serializer_class = UserSerializer

class GroupList(generics.ListAPIView):
  permission_classes = [permissions.IsAuthenticated, TokenHasScope]
  required_scopes = ['groups']
  queryset = Group.objects.all()
  serializer_class = GroupSerializer
