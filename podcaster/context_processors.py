from episodes.models import Episode, Tags, Category
from blog.models import Post

def latest_episodes(request):
    return {
        "latest_episodes": Episode.objects.filter(status='published')[0:3],
        "latest_posts": Post.objects.filter(status='published')[0:3],
        "tags": Tags.objects.all(),
        "categories": Category.objects.all(),
    }

