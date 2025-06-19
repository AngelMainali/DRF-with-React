from rest_framework import serializers
from .models import Product
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['is_staff'] = user.is_staff
        return token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']

