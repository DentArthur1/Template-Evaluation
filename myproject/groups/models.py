from django.db import models

class Group(models.Model):
    name = models.CharField(max_length=100)
    question = models.TextField()
    user1 = models.CharField(max_length=100)
    answer1 = models.TextField()
    rating1 = models.CharField(max_length=10)
    user2 = models.CharField(max_length=100)
    answer2 = models.TextField()
    rating2 = models.CharField(max_length=10)
