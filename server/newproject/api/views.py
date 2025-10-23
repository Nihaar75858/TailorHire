from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .ai_service import ai_service
from django.contrib.auth.hashers import check_password, make_password
from rest_framework_simplejwt.tokens import RefreshToken
from PyPDF2 import PdfReader
import docx
import os
import requests
from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
from .models import Resume, User, Register, ChatMessage
from .serializer import ChatMessageSerializer, ResumeSerializer, RegisterSerializer, UserSerializer

load_dotenv()

app = FastAPI()

HF_API_KEY = os.getenv("HF_API_KEY")

# Model you want to use (can change to another)
HF_MODEL = "mistralai/Mistral-7B-Instruct-v0.2"

@api_view(['GET'])
def resume_list(request):
    resume = Resume.objects.all()
    serializedData = ResumeSerializer(resume, many=True).data
    return Response(serializedData)

@api_view(['POST'])
def create_resume(request):
    data = request.data
    serializer = ResumeSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def resume_detail(request, pk):
    try:
        resume = Resume.objects.get(pk=pk)
    except Resume.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'DELETE':
        resume.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        data = request.data
        serializer = ResumeSerializer(resume, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def user_details(request, user_id):
    try:
        # First check if a User record already exists
        user = User.objects.filter(id=user_id).first()
        print("User found:", user)

        if not user:
            # Fallback: bootstrap from Register
            register = Register.objects.get(id=user_id)
            user = User.objects.create(
                id=register.id,
                username=register.username,
                email=register.email,
                first_name=register.first_name,
                last_name=register.last_name,
            )

        serializedData = UserSerializer(user).data
        return Response(serializedData, status=status.HTTP_200_OK)

    except Register.DoesNotExist:
        return Response({'error': 'User Not Found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def register(request):
    try:
        data = request.data
        data['password'] = make_password(data['password'])  # hash the password
        serializer = RegisterSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def login(request):
    try:
        username = request.data.get("username")
        password = request.data.get("password")

        # Get user by email
        try:
            user = Register.objects.get(username=username)
        except Register.DoesNotExist:
            return Response({"error": "Invalid username"}, status=status.HTTP_401_UNAUTHORIZED)

        # If password is stored hashed, use check_password
        if not check_password(password, user.password):
            return Response({"error": "Invalid password"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        return Response({"message": "Login successful", 'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role
        },
        'access': str(refresh.access_token),
        'refresh': str(refresh)}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["POST"])
def ai_job_helper_local(request):
    try:
        resume_file = request.FILES.get("resume")
        job_text = request.data.get("job", "").strip()
        print("Received job text:", job_text)
        
        resume_text = ""
        # if not resume_file or not job_text:
        #     return Response({"error": "Missing resume or job"}, status=status.HTTP_400_BAD_REQUEST)
        
        if resume_file:
            if resume_file.name.endswith(".pdf"):
                pdf = PdfReader(resume_file)
                resume_text = " ".join(page.extract_text() or "" for page in pdf.pages)

            elif resume_file.name.endswith(".docx"):
                doc = docx.Document(resume_file)
                resume_text = " ".join(p.text for p in doc.paragraphs)

            else:
                resume_text = resume_file.read().decode("utf-8", errors="ignore")
        print("Extracted resume text:", resume_text)

        cover_letter = ai_service.generate_cover_letter(resume_text, job_text)
        match_score = ai_service.match_score(resume_text, job_text)
        return Response({"cover_letter": cover_letter, "match_score": match_score})
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET', 'PUT', 'POST'])
def user_profile(request, pk):
    try:
        register = Register.objects.get(pk=pk)
    except Register.DoesNotExist:
        return Response({"error": "Register record not found"}, status=status.HTTP_404_NOT_FOUND)

    # check if User exists for this register
    user, created = User.objects.get_or_create(
        id=pk,  # assuming you have FK to Register
        defaults={
            "first_name": register.first_name,
            "last_name": register.last_name,
            "email": register.email,
            "username": register.username,
        }
    )

    if request.method == "GET":
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method in ["PUT", "POST"]:
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def chat(request):
    user_id = request.data.get("user_id")
    user_message = request.data.get("message", "")

    if not user_id:
        return Response({"error": "user_id is required"}, status=status.HTTP_400_BAD_REQUEST)
    if not user_message:
        return Response({"error": "No message provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Save user message
    ChatMessage.objects.create(user_id=user_id, role="user", content=user_message)

        # Fetch conversation history
    history = ChatMessage.objects.filter(user_id=user_id).order_by("timestamp")

    context = "\n".join(f"{msg.role}: {msg.content}" for msg in history)

    headers = {"Authorization": f"Bearer {HF_API_KEY}"}
    payload = {"inputs": context}

    try:
        try:
            response = requests.post(
                f"https://huggingface.co/{HF_MODEL}",
                headers=headers,
                json=payload,
                timeout=60  # avoid infinite hang
            )
        except requests.exceptions.RequestException as e:
            return Response({"error": "Request to Hugging Face failed", "details": str(e)}, status=500)

        if response.status_code != 200:
            return Response({
                "error": "Error from Hugging Face API",
                "status_code": response.status_code,
                "details": response.text   # raw Hugging Face error here
            }, status=500)

        data = response.json()

        if isinstance(data, list) and len(data) > 0 and "generated_text" in data[0]:
            reply = data[0]["generated_text"]
        elif isinstance(data, dict) and "generated_text" in data:
            reply = data["generated_text"]
        else:
            reply = "Sorry, I couldn’t understand."

        # Save assistant reply
        ChatMessage.objects.create(user_id=user_id, role="assistant", content=reply)

        # Return latest messages
        messages = ChatMessage.objects.filter(user_id=user_id).order_by("-timestamp")[:10]
        serialized = ChatMessageSerializer(messages, many=True)

        return Response({"reply": reply, "history": serialized.data}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)