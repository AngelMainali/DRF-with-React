from django.urls import path
from . import views
from .views import MyTokenObtainPairView, getUserProfiles, registerUser, getUsers

urlpatterns = [
    path('products/', views.getProducts, name='getProducts'), 
    path('product/<str:pk>', views.getProduct, name='getProduct'), 
    path('users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profiles/', views.getUserProfiles, name='getUserProfiles'),
    path('users/', views.getUsers, name='getUsers'),
    path('users/register/',views.registerUser , name='register'),
]
