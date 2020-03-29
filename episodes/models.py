from django.db import models
from django.utils import timezone
from django.urls import reverse
from django.utils.text import slugify
from django.conf import settings
from django.db import models
def custom_route(instance, filename):
    return 'episodes/episode-{0}/{1}'.format(instance.slug, filename)

class Category(models.Model):
    title = models.CharField(max_length=20)
    # thumbnail = models.ImageField(upload_to='blog/', blank=True, default="blog/categories/default.jpeg",
    #                                  null = True, help_text = "This picture will be uploaded to AWS.")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "categories"


class Tags(models.Model):
    title = models.CharField(max_length=40)
    # description = models.TextField()

    def __str__(self):
        return self.title


class PublishedManager(models.Manager):
    def get_queryset(self):
        return super(PublishedManager,
                     self).get_queryset()\
                          .filter(status='published')


class Episode(models.Model):
    objects = models.Manager()  # The default manager.
    # published = PublishedManager()  # Our custom manager.
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE, null=True
    )
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    meta_title = models.CharField(
        max_length=250, blank=True, null=True,  help_text="SEO Title appearing in search engines.")
    meta_description = models.CharField(
        max_length=250, blank=True, null=True,  help_text="SEO Description appearing in search engines.")
    meta_keywords = models.CharField(
        max_length=250, blank=True,  help_text="SEO Keywords helping in users searches.")
    title = models.CharField(max_length=199, unique=True)
    description = models.TextField(blank=True, null=True,  help_text="Short description for list of Episodes.")
    content = models.TextField(blank=True, null=True,  help_text="Actual text content for a Podcast, transcriptions etc.")

    # Possible troubles with russin?
    slug = models.SlugField(max_length=250, allow_unicode=True, blank=True,
                            help_text="Created automatically, no need to fill.")

    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10,
                              choices=STATUS_CHOICES,
                              default='draft')
    publish = models.DateTimeField(default=timezone.now)

    thumbnail = models.ImageField(upload_to=custom_route, blank=True,
                                  null=True, help_text="This picture will be uploaded to AWS.")
    background = models.ImageField(upload_to=custom_route, blank=True,
                                  null=True, help_text="This picture will be uploaded to AWS.")
    featured = models.BooleanField(default=False)
    category = models.ManyToManyField(Category, blank=True)
    tags = models.ManyToManyField(Tags, blank=True)
    audio = models.FileField(upload_to=custom_route)
    # comment = models.OneToOneField(
    #     Comment, on_delete=models.CASCADE, null=True)

    class Meta:
        verbose_name = 'Podcasts'
        verbose_name_plural = verbose_name
        ordering = ('-publish',)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('episodes:detail_episode',
                       kwargs={
                           "detail_episode_slug": self.slug
                       }
                       )

    def save(self, *args, **kwargs):

        slug_el = [self.publish.year, 
                   self.publish.month,
                   self.publish.day,
                   self.title]
        detail_episode_slug = '-'.join(['{0}'.format(element) for element in slug_el])
        self.slug = slugify(detail_episode_slug)
        super(Episode, self).save(*args, **kwargs)

    def get_queryset(self):
        qs = super(Episode, self).get_queryset()
        return qs.filter(is_published=True)

    def published(self):
        qs = Episode.objects.filter(is_published=True)
        return qs
