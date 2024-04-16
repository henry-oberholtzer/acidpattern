from django.urls import path
from users.views import UserDetails, UserList

urlpatterns = [
  path('users/', UserList.as_view()),
  path('users/<pk>', UserDetails.as_view()),
]
