# from rest_framework.views import APIView
from rest_framework.generics import (
    ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, CreateAPIView, UpdateAPIView)
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

from .models import Post
from .serializer import PostSerializer


class PostListView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]


class PostDetailView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = []
        try:
            queryset.append(Post.objects.get(slug=self.kwargs["slug"]))
        except:
            pass
        return queryset
        serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(slug=self.kwargs["slug"])

    def get_object(self):
        try:
            queryset = Post.objects.get(slug=self.kwargs["slug"])
            return queryset
            serializer_class = PostSerializer
        except:
            return []
            serializer_class = PostSerializer


# class PostsApiViews(APIView):

#     def get_object_by_id(self, id):
#         try:
#             post = Post.objects.get(id=id)
#             print(post)
#         except Post.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     def get(self, request, id=None):
#         if id != None:
#             post = get_object_By_id(id)
#             serializer = PostSerializer(post)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         post = Post.objects.all()
#         serializer = PostSerializer(post, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
