from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
  email = models.EmailField(unique=True)

class Profile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
  photo = models.ImageField(upload_to=f"profiles/photos")
  bio = models.CharField(max_length=255)

  def __str__(self):
    return "%s's profile." % (self.user.username)
