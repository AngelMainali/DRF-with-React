from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer, MyTokenObtainPairSerializer, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken




# For rendering templates (email body)
from django.template.loader import render_to_string

# For encoding/decoding user id safely in URLs
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

# For converting data to bytes or text safely
from django.utils.encoding import force_bytes, force_str  # force_text is deprecated, use force_str

# For sending email with more control
from django.core.mail import EmailMessage

# For accessing Django settings (email config, site domain, etc.)
from django.conf import settings

from .utils import TokenGenerator,generate_token

from django.views.generic import View



@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfiles(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    user = User.objects.all() 
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    data=request.data
    try:
        user = User.objects.create(
            first_name=data['fname'],
            last_name=data['lname'],
            username=data['email'],
            password=make_password(data['password']),
            is_active=False
        )
        
        serializer = UserSerializer(user, many=False)
        
                
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': serializer.data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })




    except:    
        message={'error':'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)