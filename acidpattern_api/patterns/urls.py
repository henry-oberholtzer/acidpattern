from django.urls import path
from patterns import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
  path('', views.api_root),
  path('patterns/', 
      views.PatternList.as_view(),
      name='pattern-list'),
  path('patterns/<int:pk>',
      views.PatternDetail.as_view(),
      name='pattern-detail'),

]

urlpatterns = format_suffix_patterns(urlpatterns)
