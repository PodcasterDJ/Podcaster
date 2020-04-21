from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Post
from .serializer import PostSerializer


class PostsApiViews(APIView):

    def get_object_By_id(self, id):
        try:
            post = Post.objects.get(id=id)
            print(post)
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, id = None):
        if id != None:
            post = get_object_By_id(id)
            serializer = PostSerializer(post)
            return Response(serializer.data , status= status.HTTP_200_OK)
        post = Post.objects.all()
        serializer = PostSerializer(post, many=True)
        return Response(serializer.data , status= status.HTTP_200_OK)