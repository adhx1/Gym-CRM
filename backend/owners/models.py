from django.contrib.auth.models import AbstractUser
from django.db import models

class Owner(AbstractUser):
    gym_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
