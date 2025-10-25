from django.db import models

# Create your models here.
class User(models.Model):
    firstName = models.CharField(max_length=120)
    lastName = models.CharField(max_length=120)
    username = models.CharField(max_length=120)
    email = models.EmailField(max_length=120)
    password = models.CharField(max_length=120)
    role = models.CharField(max_length=120)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.firstName