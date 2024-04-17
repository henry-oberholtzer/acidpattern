from rest_framework.response import Response
from rest_framework import permissions, generics
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib.auth import login
from users.models import User
from users.serializers import LoginSerializer, UserSerializer
from knox.views import LoginView as KnoxLoginView
from knox.auth import AuthToken


class UserList(generics.ListCreateAPIView):
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]
  queryset = User.objects.all().order_by("username")
  serializer_class = UserSerializer

class UserDetails(generics.RetrieveAPIView):
  permission_classes = [permissions.IsAuthenticated]
  queryset = User.objects.all()
  serializer_class = UserSerializer

class CreateUserView(generics.CreateAPIView):
  serializer_class = UserSerializer

class LoginView(KnoxLoginView):
  pass

