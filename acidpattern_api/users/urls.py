from django.urls import path
from users.views import UserDetails, UserList, LoginView, ManageUserView
from knox import views as knox_views

urlpatterns = [
  path('users/',
    UserList.as_view(),
    name='user-list'),
  path('users/<int:pk>',
    UserDetails.as_view(),
    name='user-detail'),
  path('profile/',
    ManageUserView.as_view(),
    name='profile'),
  path('login/',
    LoginView.as_view(),
    name='knox_login'),
  path('logout/',
    knox_views.LogoutView.as_view(),
    name='knox_logout'),
  path('logoutall/',
    knox_views.LogoutAllView.as_view(),
    name='knox_logoutall'),
]
