from modeltranslation.translator import translator, TranslationOptions
from .models import Post

# Saving edited content with Styling doesnt work, only works on clean, not modified fields.
class PostTranslationOptions(TranslationOptions):
    fields = ('meta_title', 'meta_description', 'meta_keywords',
              'title', 'slug', 'overview', 'content',)


translator.register(Post, PostTranslationOptions)
