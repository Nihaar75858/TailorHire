from django.urls import path
from .views import resume_list, create_resume, resume_detail, login, register, user_details

urlpatterns = [
    path('resume/', resume_list, name='resume_list'),
    path('resume/create/', create_resume, name='create_resume'),
    path('resume/<int:pk>/', resume_detail, name='resume_detail'),
    path('login/', login, name='login'),
    path('register/', register, name='register'),
    path('user/<int:pk>/', user_details, name='user_details'),
]
