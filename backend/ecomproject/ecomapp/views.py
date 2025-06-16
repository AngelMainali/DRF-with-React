from rest_framework.response import Response
from rest_framework.decorators import api_view
from .products import products



@api_view(['GET'])
def home(request):
     return Response('hi')


@api_view(['GET'])
def getProducts(request):
     return Response(products)

