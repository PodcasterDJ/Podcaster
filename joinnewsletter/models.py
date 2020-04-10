from django.db import models

# Create your models here.
class Join(models.Model):
    email = models.EmailField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
    class Meta:
        verbose_name = 'Emails of subscribers'
        verbose_name_plural = verbose_name