from django.urls import path
from .views import BlogListView, BlogDetailView
from .apiviews import PostDetailApiView, PostListApiView


app_name = 'blog'

# API URLs
urlpatterns = [
    # Show all posts
    path("posts/", PostListApiView.as_view(), name="posts"),
    # Show one post
    path("posts/<str:slug>", PostDetailApiView.as_view(),
         name="single-post"),
    # path('', PostsApiViews.as_view()),
]

# Old template views
urlpatterns += [
    path('', BlogListView.as_view(), name='blog_list'),
    path('posts/<detail_post_slug>',
         BlogDetailView.as_view(), name='post_detail'),
]
