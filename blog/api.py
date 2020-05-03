from rest_framework.views import APIView
from rest_framework.generics import (
    ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, CreateAPIView, UpdateAPIView)
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

from .models import Post
from .serializer import PostSerializer


class PostListApiView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]


class PostDetailApiView(ListAPIView, CreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

    # Default behaviour, does this:
    # def perform_create(self, serializer):
    #     serializer.save(title=self.kwargs["title"])

    def create(self, request, *args, **kwargs):
            response = super().create(request, *args, **kwargs)
            return Response({
                'status': 200,
                'message': 'Post created!',
                'data': response.data
            })
            
    def get_queryset(self):
        queryset = []
        try:
            queryset.append(Post.objects.get(slug=self.kwargs["slug"]))
        except:
            Response(status=status.HTTP_404_NOT_FOUND)
        return queryset

    def get_object(self):
        try:
            queryset = Post.objects.get(slug=self.kwargs["slug"])
            serializer_class = PostSerializer
        except:
            Response(status=status.HTTP_404_NOT_FOUND)
        return queryset



# Api view method
# class PostDetailApiView(APIView):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
#     permission_classes = [AllowAny]
#     def perform_create(self, serializer):
#         serializer.save(title=self.kwargs["title"])

#     def post(self, request, title):

#         # Create an article from the above data
#         serializer = PostSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save(title=title)
#             article_saved = serializer.save()
#         return Response({"success": "Article '{}' created successfully".format(article_saved.title)})

#     def get(self, request, title):
#         try:
#             queryset = Post.objects.get(title=title)
#             serializer_class = PostSerializer
#         except:
#             Response(status=status.HTTP_404_NOT_FOUND)
#         print(queryset.slug)
#         return Response({"success": "Obj '{}'".format(str(queryset))}) # This will return string-like obj. obj.slug obj.content


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
