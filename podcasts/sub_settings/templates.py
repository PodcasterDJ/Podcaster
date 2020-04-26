import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
print('MY DIST', os.path.join(BASE_DIR, 'dist'))
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, '..', 'dist')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.i18n',
                'settings.context_processors.social_media',
                'settings.context_processors.page_description',
                'settings.context_processors.page_background',
                # Custom context processor listing 3 latest episodes
                "podcasts.context_processors.latest_episodes",
            ],
        },
    },
]
# Template directory setting
# TEMPLATE_DIRS = (
#     os.path.join(os.path.dirname(__file__), '..', 'templates'),
#     os.path.join(BASE_DIR, '..', 'staticfiles'),
#     os.path.join(BASE_DIR, '..', 'dirs'),
# )
