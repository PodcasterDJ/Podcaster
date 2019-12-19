from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.utils.translation import activate
from episodes.models import Episode


def redirectHome(request):
    return HttpResponseRedirect('/home')


def home(request):
    activate('en')
    episode_list = Episode.objects.first()
    last_episode = Episode.objects.first()
    context = {"episode_list" : episode_list, 
    "last_episode": last_episode}
    # response = self.client.get(reverse("home"))
    # self.assertTemplateUsed(response, "taskbuster/index.html")
    return render(request, 'base.html', context)
