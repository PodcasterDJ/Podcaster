from django.shortcuts import render
from .models import Episode, Category, Tags
from django.views.generic import ListView, DetailView
from django.shortcuts import get_object_or_404, redirect, render
from django.views.generic import DetailView, ListView, View


# Create your views here.
class EpisodeListView(ListView):
    model = Episode
    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        context['tags'] = Tags.objects.all()
        context['episode_list'] = Episode.objects.filter(status='published')
        return context

class EpisodeDetailView(View):
    """Return an episode
    Simple getting interviews info.
    """
    model = Episode

    def get(self, request, detail_episode_slug, *args, **kwargs):
        episode = get_object_or_404(Episode, slug=detail_episode_slug)
        context = {'episode_details': episode}
        return render(request, "episodes/episode_details.html", context)