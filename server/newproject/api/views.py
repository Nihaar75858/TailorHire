from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Resume, User
from .serializer import ResumeSerializer, LoginSerializer, RegisterSerializer, UserSerializer

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
def user_details(request):
    user = User.objects.all()
    serializedData = UserSerializer(user, many=True).data
    return Response(serializedData)

@api_view(['POST'])
def create_user(request):
    data = request.data
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register(request):
    try :
        data = request.data
        serializer = RegisterSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    except :
        return Response(status = status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def login(request):
    try :
        data = request.data
        serializer = LoginSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    except :
        return Response(status = status.HTTP_400_BAD_REQUEST)
    