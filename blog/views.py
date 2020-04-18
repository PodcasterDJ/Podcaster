from django.shortcuts import render, get_object_or_404
from django.views.generic import ListView, DetailView, View
from .models import Post
from episodes.models import Category, Tags
from rest_framework import viewsets

# Create your views here.
from .serializers import PostSerializer, PostDetailsSerializers


class BlogListView(ListView):
    model = Post
    template_name = 'blog/blog_list.html'

    def get_context_data(self, **kwargs):
        post_list = Post.objects.filter(status='published')
        context = super().get_context_data(**kwargs)
        context['post_list'] = post_list
        context['categories'] = Category.objects.all()
        context['tags'] = Tags.objects.all()
        return context


class BlogDetailView(View):
    model = Post

    def get(self, request, detail_post_slug, *args, **kwargs):
        post = get_object_or_404(Post, slug=detail_post_slug)
        # gallery = InterviewImage.objects.filter(interview__title=interview)
        context = {'post_details': post}
        return render(request, "blog/blog_details.html", context)


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    http_method_names = ['get', 'head', 'list']


class PostDetailViewSet(viewsets.ModelViewSet):
    serializer_class = PostDetailsSerializers
    queryset = Post.objects.all()
    http_method_names = ['get', 'head', 'list']
