from django.test import TestCase
from django.urls import reverse
from patterns.models import Pattern, Settings
from rest_framework.test import APITestCase, APIClient
from knox.models import AuthToken
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from users.models import User


general_data = {
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
      },
      'sections': [
        {
        'name': 'A',
        'pitch_mode': [
          {
            'index': 0,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          {
            'index': 1,
            'pitch': 39,
            'accent': False,
            'slide': False,
            'octave': 12,
          },
        ],
        'time_mode': [
          {
            'index': 0,
            'timing': 1
          },
          {
            'index': 1,
            'timing': 1
          },
        ],
        },
        {
        'name': 'B',
        'pitch_mode': [],
        'time_mode': [],
        }
      ],}

class PatternListView(APITestCase):
  def setUp(self):
    self.client = APIClient()
    self.username = "test"
    self.email = "test@email.net"
    self.password = "my_test_password"
    self.user = get_user_model().objects.create(
      username=self.username,
      email=self.email,
      password=self.password)
    self.user.save()
    self.client.force_authenticate(user=self.user)
    
  def test_pattern_list_post(self):
    url = reverse('pattern-list')
    data = {
      'name': 'Sunday Experimenter',
      'author': self.user.pk,
      'settings': {
        'tempo': 130,
        'waveform': 'saw',
        'tuning': 0,
        'cut_off_freq': 63,
        'resonance': 63,
        'env_mod': 63,
        'decay': 63,
        'accent': 63
      },
      'sections': [
        {
        'name': 'A',
        'pitch_mode': [
          {
            'index': 0,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          {
            'index': 1,
            'pitch': 39,
            'accent': False,
            'slide': False,
            'octave': 12,
          },
        ],
        'time_mode': [
          {
            'index': 0,
            'timing': 1
          },
          {
            'index': 1,
            'timing': 1
          },
        ],
        },
        {
        'name': 'B',
        'pitch_mode': [],
        'time_mode': [],
        }
      ],}
    response = self.client.post(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertEqual(Pattern.objects.get().name, 'Sunday Experimenter')
    self.assertEqual(Pattern.objects.count(), 1)
  def test_pattern_list_post_invalid_none(self):
    url = reverse('pattern-list')
    data = {'name': '',
            'settings': {
        'tempo': 130,
        'waveform': 'saw',
        'tuning': 0,
        'cut_off_freq': 63,
        'resonance': 63,
        'env_mod': 63,
        'decay': 63,
        'accent': 63
      }, 
      'sections': [
        {
        'name': 'A',
        'pitch_mode': [],
        'time_mode': [],
        },
        {
        'name': 'B',
        'pitch_mode': [],
        'time_mode': [],
        }
      ],}
    response = self.client.post(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
  def test_pattern_list_post_invalid_too_long(self):
    url = reverse('pattern-list')
    data = {'name': 'this name is going to be way too long to reliably have a name on the website',
            'settings': {
        'tempo': 130,
        'waveform': 'saw',
        'tuning': 0,
        'cut_off_freq': 63,
        'resonance': 63,
        'env_mod': 63,
        'decay': 63,
        'accent': 63
      },  
      'sections': [
        {
        'name': 'A',
        'pitch_mode': [
          {
            'index': 0,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          {
            'index': 1,
            'pitch': 39,
            'accent': False,
            'slide': False,
            'octave': 12,
          },
        ],
        'time_mode': [
          {
            'index': 0,
            'timing': 1
          },
          {
            'index': 1,
            'timing': 1
          },
        ],
        },
        {
        'name': 'B',
        'pitch_mode': [],
        'time_mode': [],
        }
      ],}
    response = self.client.post(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)        
  def test_pattern_list_get(self):
    url = reverse('pattern-list')
    data = general_data
    self.client.post(url, data, format='json')
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
      },
      'sections': [
        {
        'name': 'A',
        'pitch_mode': [
          {
            'index': 0,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          {
            'index': 1,
            'pitch': 39,
            'accent': False,
            'slide': False,
            'octave': 12,
          },
        ],
        'time_mode': [
          {
            'index': 0,
            'timing': 1
          },
          {
            'index': 1,
            'timing': 1
          },
        ],
        },
        {
        'name': 'B',
        'pitch_mode': [],
        'time_mode': [],
        }
      ],
        }
    self.client.post(url, data2, format='json')
    response = self.client.get(url)
    self.assertEqual(response.data['count'], 2)
  def test_excessive_sections(self):
    url = reverse('pattern-list')
    data = {
      'name': 'Two Kids In The Bank',
      'settings': {
      'tempo': 130,
      'waveform': 'square',
      'tuning': 0,
      'cut_off_freq': 63,
      'resonance': 111,
      'env_mod': 63,
      'decay': 63,
      'accent': 127
    },
      'sections': [
        {
        'name': 'A',
        'pitch_mode': [],
        'time_mode': [],
        },
        {
        'name': 'B',
        'pitch_mode': [],
        'time_mode': [],
        },
        {
        'name': 'B',
        'pitch_mode': [],
        'time_mode': [],
        },
      ],}
    response = self.client.post(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
  def test_excessive_pitch(self):
    url = reverse('pattern-list')
    data = {
      'name': 'Two Kids In The Bank',
      'settings': {
      'tempo': 130,
      'waveform': 'square',
      'tuning': 0,
      'cut_off_freq': 63,
      'resonance': 111,
      'env_mod': 63,
      'decay': 63,
      'accent': 127
    },
      'sections': [
        {
        'name': 'A',
        'pitch_mode': [
          {
            'index': 0,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          {
            'index': 1,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          {
            'index': 2,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          {
            'index': 3,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          {
            'index': 4,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          {
            'index': 5,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          {
            'index': 6,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          {
            'index': 7,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          {
            'index': 8,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          {
            'index': 9,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          {
            'index': 10,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          {
            'index': 11,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          {
            'index': 12,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          {
            'index': 13,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          {
            'index': 14,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          {
            'index': 15,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          {
            'index': 16,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          ],
        'time_mode': [],
        },
        {
        'name': 'B',
        'pitch_mode': [],
        'time_mode': [],
        },
      ],}
    response = self.client.post(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
  def test_excessive_time(self):
    data = {
      'name': 'Two Kids In The Bank',
      'settings': {
      'tempo': 130,
      'waveform': 'square',
      'tuning': 0,
      'cut_off_freq': 63,
      'resonance': 111,
      'env_mod': 63,
      'decay': 63,
      'accent': 127
    },
      'sections': [
        {
        'name': 'A',
        'pitch_mode': [],
        'time_mode': 
        [
          {
            'index': 1,
            'timing': 1
          },
          {
            'index': 2,
            'timing': 1
          },
          {
            'index': 3,
            'timing': 1
          },
          {
            'index': 4,
            'timing': 1
          },
          {
            'index': 5,
            'timing': 1
          },
          {
            'index': 6,
            'timing': 1
          },
          {
            'index': 7,
            'timing': 1
          },
          {
            'index': 8,
            'timing': 1
          },
          {
            'index': 9,
            'timing': 1
          },
          {
            'index': 10,
            'timing': 1
          },
          {
            'index': 11,
            'timing': 1
          },
          {
            'index': 12,
            'timing': 1
          },
          {
            'index': 13,
            'timing': 1
          },
          {
            'index': 14,
            'timing': 1
          },
          {
            'index': 15,
            'timing': 1
          },
          {
            'index': 16,
            'timing': 1
          },
        ],
        },
        {
        'name': 'B',
        'pitch_mode': [],
        'time_mode': [],
        },
      ],}
    url = reverse('pattern-list')
    response = self.client.post(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
class PatternDetailView(APITestCase):
  def setUp(self):
    list_url = reverse('pattern-list')
    data = {
    'name': 'Two Kids In The Bank',
    'settings': {
      'tempo': 145,
      'waveform': 'square',
      'tuning': 0,
      'cut_off_freq': 63,
      'resonance': 63,
      'env_mod': 63,
      'decay': 63,
      'accent': 63
      },
    'sections': [
        {
        'name': 'A',
        'pitch_mode': [
          {
            'index': 0,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          {
            'index': 1,
            'pitch': 39,
            'accent': False,
            'slide': False,
            'octave': 12,
          },
        ],
        'time_mode': [
          {
            'index': 0,
            'timing': 1
          },
          {
            'index': 1,
            'timing': 1
          },
        ],
        },
        {
        'name': 'B',
        'pitch_mode': [],
        'time_mode': [],
        }
      ],
    }
    self.username = "test"
    self.email = "test@email.net"
    self.password = "my_test_password"
    self.user = get_user_model().objects.create(
      username=self.username,
      email=self.email,
      password=self.password)
    self.token = AuthToken.objects.create(user=self.user)
    self.client = APIClient()
    self.client.force_authenticate(user=self.user)
    response = self.client.post(list_url, data, format='json')

    self.assertEqual(response.status_code, status.HTTP_201_CREATED)

  def test_pattern_detail_get(self):  
    url = reverse('pattern-detail', args=(1,))
    response = self.client.get(url)
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data['name'], 'Two Kids In The Bank')
    self.assertEqual(response.data['settings']['waveform'], 'square')
  
  def test_pattern_does_not_exist(self):
    url_404 = reverse('pattern-detail', args=(2,))
    response_404 = self.client.get(url_404)
    self.assertEqual(response_404.status_code, status.HTTP_404_NOT_FOUND)
    url_200 = reverse('pattern-detail', args=(1,))
    response_200 = self.client.get(url_200)
    self.assertEqual(response_200.status_code, status.HTTP_200_OK)
    
    
  def test_pattern_detail_put(self):
    url = reverse('pattern-detail', args=(1,))
    put_data = {
      'name': 'Lochi - Two Kids In The Bank',
      'settings': {
      'tempo': 150,
      'waveform': 'square',
      'tuning': 0,
      'cut_off_freq': 63,
      'resonance': 111,
      'env_mod': 63,
      'decay': 63,
      'accent': 127
    },
      'sections': [
        {
        'name': 'A',
        'pitch_mode': [
          {
            'index': 0,
            'pitch': 36,
            'accent': True,
            'slide': False,
          },
          {
            'index': 1,
            'pitch': 39,
            'accent': False,
            'slide': False,
            'octave': 12,
          },
        ],
        'time_mode': [
          {
            'index': 0,
            'timing': 1
          },
          {
            'index': 1,
            'timing': 1
          },
        ],
        },
        {
        'name': 'B',
        'pitch_mode': [],
        'time_mode': [],
        }
      ],}
    response = self.client.put(url, put_data, format='json')
    self.assertEqual(response.data['settings']['tempo'], put_data['settings']['tempo'])
    self.assertEqual(response.data['name'], put_data['name'])
    
  def test_pattern_detail_put_invalid(self):
    url = reverse('pattern-detail', args=(1,))
    put_data = {
      'name': 'Two Kids In The Bank',
      'settings': {
      'tempo': 301,
      'waveform': 'square',
      'tuning': 0,
      'cut_off_freq': 63,
      'resonance': 111,
      'env_mod': 63,
      'decay': 63,
      'accent': 127
    },
      'sections': [
        {
        'name': 'A',
        'pitch_mode': [],
        'time_mode': [],
        },
        {
        'name': 'B',
        'pitch_mode': [],
        'time_mode': [],
        }
      ],}
    response = self.client.put(url, data=put_data, format='json')
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
  def test_pattern_detail_delete(self):
    url = reverse('pattern-detail', args=(1,))
    response = self.client.delete(url)
    self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
  
