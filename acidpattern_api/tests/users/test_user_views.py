from datetime import timedelta, timezone
from rest_framework.test import APITestCase, APIClient
from knox.models import AuthToken
from users.models import User
from rest_framework import status
from django.contrib.auth import get_user_model, get_user

def authUser(self: APITestCase, username="test", email="test@email.net", password="my_test_password"):
    self.client = APIClient()
    self.user = get_user_model().objects.create(
      username=username,
      email=email,
      password=password)
    self.client.force_authenticate(user=self.user)

def createUser(username, email, password="testing_password123!"):
  get_user_model().objects.create(
      username=username,
      email=email,
      password=password)

class TestUser(APITestCase):
  def setUp(self):
    authUser(self)
  
  def test_token(self):
    response = self.client.get('/users/', format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)

class TestUserList(APITestCase):
  def setUp(self):
    authUser(self, username="A")
    
  def test_001_access_when_logged_in(self):
    response = self.client.get('/users/', format='json')
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.data['count'], 1)
  def test_002_access_when_logged_out(self):
    self.client.force_authenticate(user=None)
    response = self.client.get('/users/', format='json')
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.data['count'], 1)
    
  def test_003_assert_order(self):
    createUser(username="D", email="D@email.com")
    createUser(username="B", email="B@email.com")
    response = self.client.get('/users/', format='json')
    usernames = [user['username'] for user in response.data['results']]
    expected_order = ['A', 'B', 'D']
    self.assertEqual(usernames, expected_order)

class TestUserDetails(APITestCase):
  def setUp(self):
    authUser(self, username="B")
    createUser(username="D", email="D@email.com")
    createUser(username="gerald", email="gerald@email.com")
    
  def test_001_access_when_logged_in(self):
    response = self.client.get('/users/2', format='json')
    self.assertEqual(response.data['username'], 'D')
  def test_002_access_denied_when_logged_out(self):
    self.client.force_authenticate(user=None)
    response = self.client.get('/users/2', format='json')
    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class TestUserCreate(APITestCase):
  def test_001_allow_user_creation(self):
    pass
  def test_002_deny_user_creation_if_username_take(self):
    pass
  def test_003_deny_user_creation_if_email_used(self):
    pass
  def test_004_deny_user_creation_if_password_insecure(self):
    pass

class TestUserLogin(APITestCase):
  def test_001_valid_login(self):
    pass
  def test_002_invalid_login(self):
    pass

class TestManageUser(APITestCase):
  def test_001_access_if_current_user(self):
    pass
  def test_002_no_access_if_not_user(self):
    pass
