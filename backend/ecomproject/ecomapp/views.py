from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ProductSerializer 
from .models import Product
from rest_framework import status
  


@api_view(['GET'])
def getProducts(request):
     products=Product.objects.all()
     serializer=ProductSerializer(products,many=True)
     return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)


