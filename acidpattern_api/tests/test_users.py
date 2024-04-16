from rest_framework.test import APITestCase
from users.models import User
from tests.helpers import APIClient

class TestUser(APITestCase):
  client_class = APIClient
  
  def test_authenticate(self):
    user = User(username='test', email='test@test.com')
    user.save()
    self.client.credentials(user, 'patterns')
    response = self.client.get('/patterns/', format='json')
    self.assertEqual(response.status_code, 200)
