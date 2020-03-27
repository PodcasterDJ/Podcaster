from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.utils.translation import activate
from episodes.models import Episode


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
