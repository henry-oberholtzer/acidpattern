from django.urls import path
from users.views import UserDetails, UserList

urlpatterns = [
  path('users/',
    UserList.as_view(),
    name='user-list'),
  path('users/<int:pk>',
    UserDetails.as_view(),
    name='user-detail'),
]
