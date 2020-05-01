from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import GeneralInfo
from .serializer import PostSerializer


class GeneralInfoApiViews(APIView):

    def get_object_By_id(self, id):
        try:
            post = GeneralInfo.objects.get(id=id)
            print(post)
        except GeneralInfo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, id=None):
        if id != None:
            post = get_object_By_id(id)
            serializer = PostSerializer(post)
            return Response(serializer.data, status=status.HTTP_200_OK)
        post = GeneralInfo.objects.all()
        serializer = PostSerializer(post, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
