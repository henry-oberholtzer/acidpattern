import base64
from datetime import timedelta, timezone
from rest_framework.test import APITestCase, APIClient
from knox.models import AuthToken
from users.models import User
from rest_framework import status
from django.urls import reverse
from django.contrib.auth import get_user_model

def get_basic_auth_header(username, password):
    return 'Basic %s' % base64.b64encode(
        (f'{username}:{password}').encode('ascii')).decode()

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
    url = reverse('user-register')
    data = {
      'username': 'henry',
      'email': 'fakeemail@email.com',
      'password': '456_!FAKEPASSWORD'
    }
    response = self.client.post(url, data)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
  def test_002_deny_user_creation_if_username_take(self):
    url = reverse('user-register')
    username = 'henry'
    data = {
      'username': username,
      'email': 'fakeemail@email.com',
      'password': '456_!FAKEPASSWORD'
    }
    data2 = {
      'username': username,
      'email': 'fakeemail2@email.com',
      'password': '456_!FAKEPASSWORD'
    }
    self.client.post(url, data)
    response = self.client.post(url, data2)
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
  def test_003_deny_user_creation_if_email_used(self):
    url = reverse('user-register')
    email = 'fakeemail@email.com'
    data = {
      'username': 'henry',
      'email': email,
      'password': '456_!FAKEPASSWORD'
    }
    data2 = {
      'username': 'henry23',
      'email': email,
      'password': '456_!FAKEPASSWORD'
    }
    self.client.post(url, data)
    response = self.client.post(url, data2)
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
  def test_005_deny_if_email_invalid(self):
    url = reverse('user-register')
    email = 'fakeemailemail.com'
    data = {
      'username': 'henry',
      'email': email,
      'password': '456_!FAKEPASSWORD'
    }
    response = self.client.post(url, data)
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
  def test_004_deny_user_creation_if_password_insecure(self):
    url = reverse('user-register')
    data = {
      'username': 'henry',
      'email': 'fakeemail@email.com',
      'password': 'password'
    }
    response = self.client.post(url, data)
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class TestUserLogin(APITestCase):

  def test_001_valid_login(self):
    username = "henry"
    password = "secure_test!!!"
    email="henry@email.com"
    userdata = {
      'username': username,
      'password': password,
      'email': email
    }
    register_url = reverse('user-register')
    register_response = self.client.post(register_url, userdata)
    self.assertEqual(register_response.status_code, status.HTTP_201_CREATED)
    url = reverse('knox_login')
    self.client.credentials(
      HTTP_AUTHORIZATION=get_basic_auth_header(username, password)
    )
    response = self.client.post(url, {}, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
  def test_002_invalid_login(self):
    username = "henry"
    password = "secure_test!!!"
    email="henry@email.com"
    userdata = {
      'username': username,
      'password': password,
      'email': email
    }
    register_url = reverse('user-register')
    register_response = self.client.post(register_url, userdata)
    self.assertEqual(register_response.status_code, status.HTTP_201_CREATED)
    url = reverse('knox_login')
    self.client.credentials(
      HTTP_AUTHORIZATION=get_basic_auth_header(username, "wrong_password")
    )
    response = self.client.post(url, {}, format='json')
    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
