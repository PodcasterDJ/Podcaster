from django.shortcuts import render
from .models import Episode, Category, Tags
from django.views.generic import ListView, DetailView
from django.shortcuts import get_object_or_404, redirect, render
from django.views.generic import DetailView, ListView, View


# Create your views here.
class EpisodeListView(ListView):
    model = Episode
    # Changning the objects to Episodes that are published

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        print(context)
        # # Getting only published lessons and interviews.
        # context['lessons'] = Lesson.objects.filter(is_published=True).filter(Episode__title=context['object'].title)
        context['categories'] = Category.objects.all()
        context['tags'] = Tags.objects.all()
        context['episode_list'] = Episode.objects.filter(status='published')
        print(context)
        # context['interviews'] = Interview.objects.filter(is_published=True)
        return context

class EpisodeDetailView(View):
    """Return an episode

    Simple getting interviews info.
    """
    model = Episode

    def get(self, request, detail_episode_slug, *args, **kwargs):
        episode = get_object_or_404(Episode, slug=detail_episode_slug)
        # gallery = InterviewImage.objects.filter(interview__title=interview)
        context = {'episode': episode}
        return render(request, "episodes/episode_details.html", context)
    
    # For DetailView
    # Getting extra context for the template
    # def get_context_data(self, **kwargs):
    #     # Call the base implementation first to get a context
    #     context = super().get_context_data(**kwargs)
    #     return context