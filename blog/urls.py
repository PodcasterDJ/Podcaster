from django.urls import path
from .views import BlogListView, BlogDetailView
from .api import PostDetailApiView, PostListApiView


app_name = 'blog'

urlpatterns = []

 
# API URLs
urlpatterns += [
    # Show all posts
    path("api/posts/", PostListApiView.as_view(), name="posts"),
    # Show one post
    path("api/posts/<slug:slug>", PostDetailApiView.as_view(),
         name="single-post"),
    # path('', PostsApiViews.as_view()),
]
# Old template views
urlpatterns += [
    path('', BlogListView.as_view(), name='blog_list'),
    path('posts/<detail_post_slug>',
         BlogDetailView.as_view(), name='post_detail'),
]
