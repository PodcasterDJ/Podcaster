from django.db import models
from django.utils import timezone
from django.urls import reverse
from django.utils.text import slugify
# from langdetect import detect
# from django.contrib.auth import get_user_model

# User = get_user_model()


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


class Post(models.Model):
    objects = models.Manager()  # The default manager.
    published = PublishedManager()  # Our custom manager.

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
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10,
                              choices=STATUS_CHOICES,
                              default='draft')
    publish = models.DateTimeField(default=timezone.now)

    thumbnail = models.ImageField(upload_to='blog/', blank=True, default="blog/default.jpeg",
                                  null=True, help_text="This picture will be uploaded to AWS.")

    content = models.TextField()

    class Meta:
        ordering = ('-publish',)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('blog_list',
                       args=[self.publish.year,
                             self.publish.month,
                             self.publish.day,
                             self.slug])

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Post, self).save(*args, **kwargs)
  