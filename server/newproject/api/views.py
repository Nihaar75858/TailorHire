from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password, make_password
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Resume, User, Register
from .serializer import ResumeSerializer, RegisterSerializer, UserSerializer

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
        user = Register.objects.get(id=user_id)
        serializedData = RegisterSerializer(user).data
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
        
        print(f"Login attempt with username: {username} and password: {password}")

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