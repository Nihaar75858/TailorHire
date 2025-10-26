from django.test import TestCase
from api import models

class UserModelTest(TestCase):
    """Tests for the CustomUser model"""
    
    def test_create_user_model(self):
        """Test user creation and __str__ method"""
        user = models.CustomUser.objects.create(
            firstName = "John",
            lastName = "Doe",
            username = "John123",
            email = "user1@example.com",
            password = "hello123",
            bio = "I am ready to work",
            location = "Indiana, USA",
            skills = "Java, Python, C",
            profile_picture="profiles/profile_picture.jpg",
            role = ["User", "Recruiter", "Admin"],
        )

        self.assertEqual(user.profile_picture, "profiles/profile_picture.jpg")