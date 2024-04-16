from rest_framework import permissions, generics
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib.auth import login
from users.models import User
from users.serializers import AuthSerializer, UserSerializer
from knox.views import LoginView as KnoxLoginView


class UserList(generics.ListCreateAPIView):
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]
  queryset = User.objects.all()
  serializer_class = UserSerializer

class UserDetails(generics.RetrieveAPIView):
  permission_classes = [permissions.IsAuthenticated]
  queryset = User.objects.all()
  serializer_class = UserSerializer

class CreateUserView(generics.CreateAPIView):
  serializer_class = UserSerializer

class LoginView(KnoxLoginView):
  serializer_class = AuthSerializer
  permission_classes = (permissions.AllowAny,)
  
  def post(self, request, format=None):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user= serializer.validated_data['user']
    login(request, user)
    return super(LoginView, self).post(request, format=None)

class ManageUserView(generics.RetrieveUpdateAPIView):
  """Manage the authenticated user"""
  permission_classes = [permissions.IsAuthenticated]
  serializer_class = UserSerializer
  
  def get_objects(self):
    return self.request.user
