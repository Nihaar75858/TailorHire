from django.test import TestCase
from newproject.models import MyModel
import datetime

class Jobs(TestCase):
    def test_create_model(self):
        jobs = MyModel.objects.create(
            title="Front-End Developer",
            company="JP Morgan",
            location="Gurgaon",
            salary_min=10000,
            salary_max=12000,
            job_type="Part-time",
            description="JP Morgan is seeking a skilled Front-End Developer with 2-3 years of experience in React to join our dynamic team on a part-time basis. You will help build and maintain visually appealing, responsive, and user-friendly interfaces for our Islamic investment marketplace and ecosystem.",
            requirements="2-3 years of professional experience with React.js.",
            is_active=True,
            posted_by="Username",
            created_at=datetime.date(2025, 6, 7),
            updated_at=datetime.date(2025, 6, 8),
        )
        
        self.assertEqual(str(jobs), jobs.title)