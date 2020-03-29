from django.db import models
from django.utils import timezone
from django.urls import reverse
from django.utils.text import slugify
from episodes.models import Tags, Category
from django.conf import settings


class PublishedManager(models.Manager):
    def get_queryset(self):
        return super(PublishedManager,
                     self).get_queryset()\
                          .filter(status='published')


class Post(models.Model):
    objects = models.Manager()  # The default manager.
    published = PublishedManager()  # Our custom manager.
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
    title = models.CharField(max_length=199)
    # Possible troubles with russin?
    slug = models.SlugField(max_length=250, allow_unicode=True, blank=True,
                            help_text="Created automatically, no need to fill.")
    overview = models.TextField()
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10,
                              choices=STATUS_CHOICES,
                              default='draft')
    publish = models.DateTimeField(default=timezone.now)

    thumbnail = models.ImageField(upload_to='blog/', blank=True, default="blog/default.jpeg",
                                  null=True, help_text="This picture will be uploaded to AWS.")


    class Meta:
        ordering = ('-publish',)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('blog:post_detail',
                       kwargs={
                           "detail_post_slug": self.slug
                       }
                       )

    def save(self, *args, **kwargs):
        # Saving slug with date formatted into it
        slug_el = [self.publish.year, 
                   self.publish.month,
                   self.publish.day,
                   self.title]
        detail_post_slug = '-'.join(['{0}'.format(element) for element in slug_el])
        self.slug = slugify(detail_post_slug)
        super(Post, self).save(*args, **kwargs)

    def get_queryset(self):
        qs = super(Post, self).get_queryset()
        return qs.filter(is_published=True)