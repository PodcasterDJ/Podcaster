from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.utils.translation import activate
from django.shortcuts import render
from episodes.models import Episode, Category, Tags
from django.views.generic import ListView, DetailView
from django.shortcuts import get_object_or_404, redirect, render
from django.views.generic import DetailView, ListView, View


# Create your views here.
class HomeView(ListView):
    model = Episode
    # Changning the objects to Episodes that are published
    template_name='home/home.html'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['episodes_list'] = Episode.objects.filter(status='published')[0:3]
        context['last_episode'] = Episode.objects.filter(status='published').first()
        return context

def redirectHome(request):
    return HttpResponseRedirect('/home')


def home(request):
    activate('en')
    episode_list = Episode.objects.filter(status='published')[0:3]
    last_episode = Episode.objects.filter(status='published').first()
    context = {"episodes_list" : episode_list, 
    "last_episode": last_episode}
    print(context)
    return render(request, 'base.html', context)
