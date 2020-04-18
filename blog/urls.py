from django.urls import path
from .views import BlogListView, BlogDetailView
from .apiviews import PostsApiViews


app_name = 'blog'

urlpatterns = [
    path('', BlogListView.as_view(), name='blog_list'),
    path('/post/<detail_post_slug>', BlogDetailView.as_view(), name='post_detail'),
    path('api/v1/post/<int:id>', PostsApiViews.as_view())
]
