from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from pathlib import Path
from api.serializer import UserSerializer
from django.core.files.uploadedfile import SimpleUploadedFile
import json

create_user = reverse('customuser-list')

def update_url(id):
    return reverse('customuser-detail', args=[id])

def details_url(id):
    return reverse('customuser-detail', args=[id])

def sample_payload():
    image_path = Path(__file__).resolve().parent.parent / "profile" / "test.jpg"
    with open(image_path, "rb") as img:
        image = SimpleUploadedFile("test.jpg", img.read(), content_type="image/jpeg")
        
    payload = {
        "firstName": "John",
        "lastName": "Doe",
        "username": "John123",
        "email": "user1@example.com",
        "password": "hello123",
        "bio": "I am ready to work",
        "location": "Indiana, USA",
        "skills": "Java, Python, C",
        "profile_picture": image,
        "role": json.dumps(["User"]),
    }
    serializer = UserSerializer(data=payload)
    serializer.is_valid(raise_exception=True)
    return serializer.save()

class UserApiTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.login_url = reverse('customuser-login-user')
        self.logout_url = reverse('customuser-logout-user')

    def test_create_user(self):
        image_path = Path(__file__).resolve().parent.parent / "profile" / "test.jpg"
        with open(image_path, "rb") as img:
            image = SimpleUploadedFile("test.jpg", img.read(), content_type="image/jpeg")
            
        payload = {
            "firstName": "John",
            "lastName": "Doe",
            "username": "John123",
            "email": "user1@example.com",
            "password": "hello123",
            "bio": "",
            "location": "",
            "skills": "",
            "profile_picture": image,
            "role": json.dumps(["User"]),
        }

        res = self.client.post(create_user, payload, format='multipart')
        print(res.data)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        
    def test_login_successful(self):
        user = sample_payload()
        payload = {
            "username": user.username,
            "password": "hello123"
        }
        res = self.client.post(self.login_url, payload, format='multipart')

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn("Login successful", res.data["message"])

    def test_login_invalid_credentials(self):
        payload = {
            "username": "wrongusername",
            "password": "wrongpassword"
        }
        res = self.client.post(self.login_url, payload, format='multipart')

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn("Invalid credentials", res.data["error"])
        
    def test_logout_user(self):
        res = self.client.post(self.logout_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn("Logged out successfully", res.data["message"])

    def test_update_user(self):
        user = sample_payload()
        image_path = Path(__file__).resolve().parent.parent / "profile" / "test.jpg"
        with open(image_path, "rb") as img:
            image = SimpleUploadedFile("test.jpg", img.read(), content_type="image/jpeg")
            
        payload = {
            "firstName": "John",
            "lastName": "Doe",
            "username": "John123",
            "email": "user1@example.com",
            "password": "hello123",
            "bio": "I am ready to work",
            "location": "Indiana, USA",
            "skills": "Java, Python, C",
            "profile_picture": image,
            "role": json.dumps(["User"]),
        }

        url = update_url(user.id)
        res = self.client.put(url, payload, format='multipart')
        print(res.data)
        user.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_user_details(self):
        user = sample_payload()
        url = details_url(user.id)

        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)