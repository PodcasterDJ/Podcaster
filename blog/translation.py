from modeltranslation.translator import translator, TranslationOptions
from .models import Post


class PostTranslationOptions(TranslationOptions):
    fields = ('meta_title', 'meta_description', 'meta_keywords',
              'title', 'slug', 'overview', 'content',)


translator.register(Post, PostTranslationOptions)
