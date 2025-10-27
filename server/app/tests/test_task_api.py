from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from api.models import CustomUser

create_url = reverse('customuser-list')
login_url = reverse('customuser-login-user')
logout_url = reverse('customuser-logout-user')

def update_url(id):
    return reverse('customuser-detail', args=[id])

def details_url(id):
    return reverse('customuser-detail', args=[id])

def sample_payload():
    payload = {
        "firstName": "John",
        "lastName": "Doe",
        "username": "John123",
        "email": "user1@example.com",
        "password": "hello123",
        "bio": "I am ready to work",
        "location": "Indiana, USA",
        "skills": "Java, Python, C",
        "profile_picture": "profiles/profile_picture.jpg",
        "role": ["User", "Recruiter", "Admin"],
    }
    return CustomUser.objects.create(**payload)
        
class UserApiTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_user(self):
        payload = {
            "firstName": "John",
            "lastName": "Doe",
            "username": "John123",
            "email": "user1@example.com",
            "password": "hello123",
            "bio": "null",
            "location": "null",
            "skills": "null",
            "profile_picture": "null",
            "role": ["User", "Recruiter", "Admin"],
        }

        res = self.client.post(create_url, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        
    def test_login_successful(self):
        user = sample_payload()
        payload = {
            "username": user.username,
            "password": user.password
        }
        res = self.client.post(login_url, payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn("Login successful", res.data["message"])

    def test_login_invalid_credentials(self):
        payload = {
            "username": "wrongusername",
            "password": "wrongpassword"
        }
        res = self.client.post(login_url, payload)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn("Invalid credentials", res.data["error"])
        
    def test_logout_user(self):
        res = self.client.post(logout_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn("Logged out successfully", res.data["message"])

    def test_update_user(self):
        user = sample_payload()

        payload = {
            "firstName": "John",
            "lastName": "Doe",
            "username": "John123",
            "email": "user1@example.com",
            "password": "hello123",
            "bio": "I am ready to work",
            "location": "Indiana, USA",
            "skills": "Java, Python, C",
            "profile_picture": "profiles/profile_picture.jpg",
            "role": ["User", "Recruiter", "Admin"],
        }

        url = update_url(user.id)
        res = self.client.put(url, payload)

        user.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_user_details(self):
        user = sample_payload()
        url = details_url(user.id)

        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)