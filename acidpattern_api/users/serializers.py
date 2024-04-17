from rest_framework import serializers
from users.models import User
from patterns.models import Pattern
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
  patterns = serializers.PrimaryKeyRelatedField(many=True, queryset=Pattern.objects.all())
  class Meta:
    model = User
    fields = ['username', 'id', 'patterns']
    extra_kwargs = {'password': {'write_only': True, 'min_length': 8}}
  
  def create(self, validated_data):
    return User.objects.create_user(**validated_data)

class AuthSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField(
    style={'input_type': 'password'},
    trim_whitespace=False
  )
  def validate(self, attrs):
    username = attrs.get('username')
    password = attrs.get('password')
    
    user = authenticate(
      request=self.context.get('request'),
      username=username,
      password=password
    )
    
    if not user:
      msg = ('Unable to authenticate with the provided credentials')
      raise serializers.ValidationError(msg, code='authentication')
    
    attrs['user'] = user
    return
