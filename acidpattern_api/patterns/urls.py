from django.urls import path
from patterns import views

urlpatterns = [
  path('patterns/', views.pattern_list, name='pattern-list')
]
