from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Leaderboard(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    score = models.IntegerField(default='0')

    def __str__(self):
        return self.user.username

