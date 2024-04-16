from datetime import timedelta, timezone
from rest_framework.test import APITestCase, APIClient
from knox.models import AuthToken
from users.models import User
from django.contrib.auth import get_user_model, get_user

class TestUser(APITestCase):
  def setUp(self):
    self.username = "test"
    self.email = "test@email.net"
    self.password = "my_test_password"
    self.user = get_user_model().objects.create(
      username=self.username,
      email=self.email,
      password=self.password)
    self.token = AuthToken.objects.create(user=self.user)
  
  def test_token(self):
    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION='Token ' + str(AuthToken.objects.get(user__username="test")))
    response = self.client.get('/users/', format='json')
    self.assertEqual(response.status_code, 200)
