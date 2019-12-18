from django.db import models
from django.utils import timezone
from django.urls import reverse
from django.utils.text import slugify


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
    description = models.TextField(blank=True, null=True)
    # Possible troubles with russin?
    slug = models.SlugField(max_length=250, allow_unicode=True, blank=True,
                            help_text="Created automatically, no need to fill.")

    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10,
                              choices=STATUS_CHOICES,
                              default='draft')
    publish = models.DateTimeField(default=timezone.now)

    thumbnail = models.ImageField(upload_to='episodes/', blank=True,
                                  null=True, help_text="This picture will be uploaded to AWS.")
   
    content = models.TextField()
    featured = models.BooleanField(default=False)
    category = models.ManyToManyField(Category, blank=True)
    tags = models.ManyToManyField(Tags, blank=True)
    audio = models.FileField(upload_to='episodes')
    # comment = models.OneToOneField(
    #     Comment, on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ('-publish',)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('list_episodes',
                       args=[self.publish.year,
                             self.publish.month,
                             self.publish.day,
                             self.slug])

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Episode, self).save(*args, **kwargs)