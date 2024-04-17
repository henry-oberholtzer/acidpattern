from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from users.models import User
from patterns.models import Pattern
from rest_framework.fields import EmailField
from django.contrib.auth import authenticate, password_validation
from django.core import exceptions

class UserSerializer(serializers.ModelSerializer):
  email = EmailField(validators=[UniqueValidator(queryset=User.objects.all(), message="This email is already in use.")])

  class Meta:
    model = User
    fields = ['username', 'email', 'password', 'id']
    extra_kwargs = {'password': {'write_only': True, 'min_length': 8}}
  
  def create(self, validated_data):
    errors = dict()
    try:
      password_validation.validate_password(password=validated_data['password'])
    except exceptions.ValidationError as e:
      errors['password'] = list(e.messages)
    if errors:
      raise serializers.ValidationError(errors)
    user = User.objects.create_user(**validated_data)
    return user
  

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
