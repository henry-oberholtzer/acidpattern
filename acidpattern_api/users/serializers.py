from rest_framework import generics, permissions, serializers
from users.models import User

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('username', 'email')


