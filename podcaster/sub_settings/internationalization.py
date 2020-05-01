import os
from django.utils.translation import ugettext_lazy as _
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'es-ES'
# List of activated
DEFAULT_LANGUAGE = 1  # the first one in the list

LANGUAGES = (
    # Translation settings:  The first language is treated as the default language.
    ('en-US', _('English')),
    ('es-ES', _('Spanish')),
)

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

LOCALE_PATHS = (
    os.path.join(BASE_DIR, '..', 'locale'),
)
