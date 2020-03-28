from episodes.models import Episode, Tags

def latest_episodes(request):
    return {
        "latest_episodes": Episode.objects.filter(status='published')[0:3],
        "tags": Tags.objects.all()
    }

