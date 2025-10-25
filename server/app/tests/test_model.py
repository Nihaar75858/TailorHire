from django.test import TestCase
from api import models
import datetime

class User(TestCase):
    def test_create_user(self):
        user = models.User.objects.create(
            firstName = "John",
            lastName = "Doe",
            username = "John123",
            email = "user1@example.com",
            password = "hello123",
            role = ["User", "Admin"],
            created_at=datetime.date(2025, 6, 7),
            updated_at=datetime.date(2025, 6, 8),
        )
        
        self.assertEqual(str(user), user.firstName + user.lastName)