from django.db import models
from django.utils import timezone

class GeneralInfo(models.Model):

    podcast_description = models.TextField(blank=True, null=True)
    personal_description = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True,
                                  null=True, help_text="This picture will be uploaded to AWS.")
    updated = models.DateTimeField(auto_now=True)
    publish = models.DateTimeField(default=timezone.now)
    patreon_link = models.CharField(max_length=250, null=True, blank=True)
    paypal_email = models.EmailField( null=True, blank=True)

    def __str__(self):
        return '{}'.format(self.updated)