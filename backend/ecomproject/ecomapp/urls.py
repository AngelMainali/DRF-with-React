from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.getProducts, name='getProducts'), 
    path('product/<str:pk>', views.getProduct, name='getProduct'), 
]
