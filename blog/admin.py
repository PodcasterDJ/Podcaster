from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from .models import Post

# Saving edited content with Styling doesnt work, only works on clean, not modified fields.

# class PostAdmin(SummernoteModelAdmin):
#     summernote_fields = ('content', 'content_en_US')


# admin.site.register(Post, PostAdmin)

admin.site.register(Post)