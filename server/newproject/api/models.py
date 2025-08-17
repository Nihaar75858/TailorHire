from django.db import models

class Resume(models.Model):
    title = models.CharField(max_length=50)
    release_year = models.IntegerField()

    def __str__(self):
        return self.title
    

class Register(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=20, default='User')  # Added role field

    def __str__(self):
        return self.username
    
class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    username = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    phone = models.CharField(max_length=15, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    profile_pic = models.URLField(default='https://via.placeholder.com/150')

    def __str__(self):
        return self.username
    