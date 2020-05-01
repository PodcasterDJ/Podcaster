from django.db import models
from django.utils import timezone

INFO_ELEMENT = (
    ('select', 'SELECT'),
    ('podcast_description', 'PODCAST_DESCRIPTION'),
    ('profile_description', 'PROFILE_DESCRIPTION'),
    ('patreon', 'PATREON'),
    ('paypal', 'PAYPAL'),
)


class GeneralInfo(models.Model):
    name = models.TextField(
        max_length=500, choices=INFO_ELEMENT, default='select', unique=True)

    # TODO: Extend User model and enrich it with photo option.
    # profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True,
    #                               null=True, help_text="This picture will be uploaded to AWS.")
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{}'.format(self.name)
