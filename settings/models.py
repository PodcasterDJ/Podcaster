from django.db import models
# from colorfield.fields import ColorField

PAGE_CHOICES = (
    ('select', 'SELECT'),
    ('home', 'HOME'),
    ('about', 'ABOUT'),
    ('podcasts', 'PODCASTS'),
    ('blog', 'BLOG'),
    ('contact', 'CONTACT'),
)
PAGE_DESCRIPTION = (
    ('select', 'SELECT'),
    ('title', 'TITLE'),
    ('description', 'DESCRIPTION'),
    ('website_url', 'WEBSITE_URL'), 
)

SOCIAL_CHOICES = (
    ('select', 'SELECT'),
    ('twitter', 'TWITTER'),
    ('facebook', 'FACEBOOK'),
    ('instagram', 'INSTAGRAM'),
    ('youtube', 'YOUTUBE'),
    ('linkedin', 'LINKEDIN'),
    ('spotify', 'SPOTIFY'),
    
)
class SocialMediaLink(models.Model):
    name = models.CharField(
        max_length=25   , choices=SOCIAL_CHOICES, default='select', unique=True)
    link = models.URLField(max_length=400, blank=True, null=True)

    def __str__(self):
        return self.name
    class Meta:
        # db_table = ''
        # managed = True
        verbose_name = 'Social Media'
        verbose_name_plural = 'Social Media'

class PageBackground(models.Model):
    name = models.CharField(
        max_length=25   , choices=PAGE_CHOICES, default='select', unique=True)
    image = models.ImageField(upload_to='backgrounds/', blank=True,
                                     null=True, help_text="This will be page bacground.")

    def __str__(self):
        return self.name
    class Meta:
        # db_table = ''
        # managed = True
        verbose_name = 'Page Backgrounds'
        verbose_name_plural = 'Page Backgrounds'

class PageDescription(models.Model):
    name = models.CharField(
        max_length=25   , choices=PAGE_DESCRIPTION, default='select', unique=True)
    content = models.CharField(blank=True, null=True, max_length=200)
    
    def __str__(self):
            return self.name
    class Meta:
        # db_table = ''
        # managed = True
        verbose_name = 'Page Description'
        verbose_name_plural = 'Page Description'

class PageOGTags(models.Model):
    name = models.CharField(
        max_length=25   , choices=PAGE_CHOICES, default='select', unique=True)
    image = models.ImageField(upload_to='backgrounds/', blank=True,
                                     null=True, help_text="This will be page bacground.")

    def __str__(self):
        return self.name
    class Meta:
        # db_table = ''
        # managed = True
        verbose_name = 'Page Backgrounds'
        verbose_name_plural = 'Page Backgrounds'