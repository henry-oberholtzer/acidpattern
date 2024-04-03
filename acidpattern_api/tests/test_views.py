from django.test import TestCase
from django.urls import reverse
from patterns.models import Pattern
from rest_framework.test import APITestCase
from rest_framework import status

class PatternListView(APITestCase):
  def test_pattern_list_post(self):
    url = reverse('pattern-list')
    data = {'name': 'Sunday Experimenter'}
    response = self.client.post(url, data , format='json')
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertEqual(Pattern.objects.count(), 1)
    self.assertEqual(Pattern.objects.get().name, 'Sunday Experimenter')
  def test_pattern_list_post_invalid_none(self):
    url = reverse('pattern-list')
    data = {'name': ''}
    response = self.client.post(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
  def test_pattern_list_post_invalid_too_long(self):
    url = reverse('pattern-list')
    data = {'name': 'this name is going to be way too long to reliably have a name on the website'}
    response = self.client.post(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
  def test_pattern_list_get(self):
    url = reverse('pattern-list')
    data = {'name': 'Sunday Experimenter'}
    self.client.post(url, data , format='json')
    url = reverse('pattern-list')
    data2 = {'name': 'Acid Over Manhattan'}
    self.client.post(url, data2 , format='json')
    response = self.client.get(url)
    self.assertEqual(len(response.data), 2)

class PatternDetailView(TestCase):
  def test_pattern_does_not_exist(self):
    pass
  def test_pattern_detail_get(self):
    pass
  def test_pattern_detail_put(self):
    pass
  def test_pattern_detail_delete(self):
    pass
