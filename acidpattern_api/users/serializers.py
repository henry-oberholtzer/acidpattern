from rest_framework import generics, permissions, serializers
from users.models import User
from django.contrib.auth.models import Group

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('username', 'email')

class GroupSerializer(serializers.ModelSerializer):
  class meta:
    model = Group
    fields = ("name",)
