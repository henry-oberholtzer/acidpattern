from rest_framework.test import APITestCase
from users.models import User

class TestUser(APITestCase):
  def test_register_user(self):
    self.user = User.objects.create_user(username="test", password="test")
    login = self.client.login(username='test', password='test')
    self.assertEqual()
    
