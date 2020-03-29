from django.shortcuts import render, get_object_or_404
from django.views.generic import ListView, DetailView, View
from .models import Post
# Create your views here.
class BlogListView(ListView):
    model = Post
    template_name = 'blog/blog_list.html'
    def get_context_data(self, **kwargs):
        post_list = Post.objects.filter(status='published')
        context = super().get_context_data(**kwargs)
        context['post_list']=post_list
        print(context)
        return context
class BlogDetailView(View):
    model = Post
    def get(self, request, detail_post_slug, *args, **kwargs):
        post = get_object_or_404(Post, slug=detail_post_slug)
        # gallery = InterviewImage.objects.filter(interview__title=interview)
        context = {'post_details': post}
        return render(request, "blog/blog_details.html", context)