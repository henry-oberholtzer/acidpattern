from datetime import timedelta, timezone
from rest_framework.test import APITestCase
from users.models import User
from tests.helpers import CustomAPIClient
from oauth2_provider.models import Application, AccessToken

class TestUser(APITestCase):
  
  def test_authenticate(self):
    user = User(username='test', email='test@test.com')
    user.save()
    client = CustomAPIClient()
    client.credentials(user, 'users')
    response = self.client.get('/users/', format='json')
    self.assertEqual(response.status_code, 200)
