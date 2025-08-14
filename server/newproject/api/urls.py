from django.urls import path
from .views import resume_list, create_resume, resume_detail, login, register, user_details, ai_job_helper_local

urlpatterns = [
    path('resume/', resume_list, name='resume_list'),
    path('resume/create/', create_resume, name='create_resume'),
    path('resume/<int:pk>/', resume_detail, name='resume_detail'),
    path('login/', login, name='login'),
    path('register/', register, name='register'),
    path('user/<int:user_id>/', user_details, name='user_details'),
    path("api/ai-job-helper-local/", ai_job_helper_local, name="ai_job_helper_local"),
]
