from django.urls import path
import users.views as views
from knox import views as knox_views

urlpatterns = [
  path('users/',
    views.UserList.as_view(),
    name='user-list'),
  path('users/<int:pk>',
    views.UserDetails.as_view(),
    name='user-detail'),
  path('register/',
    views.CreateUserView.as_view(),
    name='user-register'
    ),
  path('profile/',
    views.ManageUserView.as_view(),
    name='profile'),
  path('login/',
    views.LoginView.as_view(),
    name='knox_login'),
  path('logout/',
    knox_views.LogoutView.as_view(),
    name='knox_logout'),
  path('logoutall/',
    knox_views.LogoutAllView.as_view(),
    name='knox_logoutall'),
]
