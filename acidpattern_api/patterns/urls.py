from django.urls import path
from patterns import views

urlpatterns = [
  path('patterns/', views.pattern_list, name='pattern-list'),
  path('patterns/<int:pk>', views.pattern_detail, name='pattern-detail')
]
