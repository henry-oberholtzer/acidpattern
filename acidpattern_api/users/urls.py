from django.urls import path
from users.views import UserDetails, UserList, GroupList

urlpatterns = [
  path('users/', UserList.as_view()),
  path('users/<pk>', UserDetails.as_view()),
  path('groups/', GroupList.as_view())
]
