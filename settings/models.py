from django.db import models
# from colorfield.fields import ColorField

PAGE_CHOICES = (
    ('select', 'SELECT'),
    ('home', 'HOME'),
    ('about', 'ABOUT'),
    ('episodes', 'EPISODES'),
    ('blog', 'BLOG'),
    ('contact', 'CONTACT'),
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
    # image = models.ImageField(upload_to='backgrounds/', blank=True,
    #                                  null=True, help_text="This will be page bacground.")

    def __str__(self):
        return self.name
    class Meta:
        # db_table = ''
        # managed = True
        verbose_name = 'Page Backgrounds'
        verbose_name_plural = 'Page Backgrounds'

# Thats a model that will be responsive for any extra translation options.

# class Messages(models.Model):
#     name = models.CharField(
#         max_length=20, choices=MSG_CHOICES, default='select', unique=True)
#     message_error = models.CharField(null=True, blank=True, max_length=400)
#     message_success = models.CharField(null=True, blank=True, max_length=400)

#     message_error_es = models.CharField(null=True, blank=True, max_length=400)
#     message_success_es = models.CharField(
#         null=True, blank=True, max_length=400)

#     def __str__(self):
#         return self.name
#     class Meta:
#         # db_table = ''
#         # managed = True
#         verbose_name = '_Error and success messages for alerts'
#         verbose_name_plural = '_Error and success messages for alerts'

# class BackgroundColors(models.Model):
#     name = models.CharField(
#     max_length=20, choices=PAGE_CHOICES, default='select', unique=True)
#     background_color = ColorField(default='#f0f0f0')
#     def __str__(self):
#         if self.name:
#             return " For " + self.name + " the slider background is: " + self.background_color
#         else:
#             return self.id
#     class Meta:
#         # db_table = ''
#         # managed = True
#         verbose_name = 'Colores de fondo'
#         verbose_name_plural = 'Colores de fondo'
#     @classmethod
#     def get_content_by_page(cls, page_name):
#         return cls.objects.filter(name=page_name)