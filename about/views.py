from django.shortcuts import render
from django.utils.translation import activate
from .models import GeneralInfo
from episodes.models import Episode
from django.views.generic import ListView, DetailView
from django.shortcuts import get_object_or_404, redirect
from django.views.generic import DetailView, ListView, View
from blog.models import Post

class AboutView(ListView):
    model = Episode
    # Changning the objects to Episodes that are published
    template_name='about/about.html'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['about_me'] = GeneralInfo.objects.first()
        context['podcasts_amount'] = Episode.objects.filter(status='published').count()
        context['posts_amount'] = Post.objects.filter(status='published').count()
        return context

def about(request):
    context = {}
    return render(request, 'about/about.html', context)