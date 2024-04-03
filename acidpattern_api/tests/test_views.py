from django.test import TestCase
from django.urls import reverse
from patterns.models import Pattern, Settings
from rest_framework.test import APITestCase
from rest_framework import status

class PatternListView(APITestCase):
  def test_pattern_list_post(self):
    url = reverse('pattern-list')
    data = {
      'name': 'Sunday Experimenter',
      'settings': {
        'tempo': 130,
        'waveform': 'saw',
        'tuning': 0,
        'cut_off_freq': 63,
        'resonance': 63,
        'env_mod': 63,
        'decay': 63,
        'accent': 63
      }}
    response = self.client.post(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertEqual(Pattern.objects.get().name, 'Sunday Experimenter')
    self.assertEqual(Pattern.objects.count(), 1)
  def test_pattern_list_post_invalid_none(self):
    url = reverse('pattern-list')
    data = {'name': ''}
    response = self.client.post(url, data , format='json')
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
  def test_pattern_list_post_invalid_too_long(self):
    url = reverse('pattern-list')
    data = {'name': 'this name is going to be way too long to reliably have a name on the website'}
    response = self.client.post(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
  def test_pattern_list_get(self):
    url = reverse('pattern-list')
    data = {
        'name': 'Sunday Experimenter',
        'settings': {
        'tempo': 130,
        'waveform': 'saw',
        'tuning': 0,
        'cut_off_freq': 63,
        'resonance': 63,
        'env_mod': 63,
        'decay': 63,
        'accent': 63
      }
        }
    self.client.post(url, data, format='json')
    url = reverse('pattern-list')
    data2 = {
        'name': 'Acid Over Manhattan',
        'settings': {
        'tempo': 145,
        'waveform': 'saw',
        'tuning': 0,
        'cut_off_freq': 63,
        'resonance': 63,
        'env_mod': 63,
        'decay': 63,
        'accent': 63
      }
        }
    self.client.post(url, data2, format='json')
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
