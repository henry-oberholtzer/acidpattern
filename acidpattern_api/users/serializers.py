from rest_framework import generics, permissions, serializers
from users.models import User
from patterns.models import Pattern

class UserSerializer(serializers.ModelSerializer):
  patterns = serializers.PrimaryKeyRelatedField(many=True, queryset=Pattern.objects.all())
  
  class Meta:
    model = User
    fields = ('username', 'id', 'patterns')
