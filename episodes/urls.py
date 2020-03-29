from django.urls import path

from .views import EpisodeDetailView, EpisodeListView

app_name = 'episodes'

urlpatterns = [
    path('', EpisodeListView.as_view(), name='list_episodes'),
    path('/episode/<detail_episode_slug>', EpisodeDetailView.as_view(), name='detail_episode'),
]