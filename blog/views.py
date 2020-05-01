from django.shortcuts import render, get_object_or_404
from django.views.generic import ListView, DetailView, View
from .models import Post
from episodes.models import Category, Tags
# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Post
from .serializer import PostSerializer


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
