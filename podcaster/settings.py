import os
from .sub_settings.text_editor import *
from .sub_settings.middleware import *
from .sub_settings.installed_apps import *
from .sub_settings.templates import *
from .sub_settings.databases import *
from .sub_settings.password_validators import *
from .sub_settings.internationalization import *
from .sub_settings.logger_options import *
from .sub_settings.static_media import *
from .sub_settings.messages_tags import *

###################### 
# General Settings:  #
######################

# How to generate your own key SECRET_KEY:
# python manage.py shell 
#  >>> from django.core.management.utils import get_random_secret_key
#  >>> get_random_secret_key()
# SECURITY WARNING: keep the secret key used in production secret!



# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOT_FOLDER = os.path.dirname(BASE_DIR + '/podcaster/')

# SECURITY WARNING: don't run with debug turned on in production!
try:
    if(os.environ['ENV'] == "prod"):
        DEBUG = False
        ALLOWED_HOSTS = os.environ['ALLOWED_HOSTS']
        SECRET_KEY = os.environ['SECRET_KEY']
        print("Using PRODUCTION configuration.")
    else:
        DEBUG = True
        ALLOWED_HOSTS = ['*']
        SECRET_KEY = '4gbt+ow7luo&vbv96uug+81_+$$)zpf28xb!@#$+($(93+kz@0'
        DEBUG_PROPAGATE_EXCEPTIONS = True
except:
    DEBUG = True
    ALLOWED_HOSTS = ['*']
    SECRET_KEY = '4gbt+ow7luo&vbv96uug+81_+$$)zpf28xb!@#$+($(93+kz@0'
    DEBUG_PROPAGATE_EXCEPTIONS = True
    print("Using DEBUG configuration.")

ROOT_URLCONF = 'podcaster.urls'
WSGI_APPLICATION = 'podcaster.wsgi.application'


###################### 
# ADJUST SETTINGS:  #
######################

#Official docs use
APPEND_SLASH = False
REST_FRAMEWORK = { 'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema' }

SWAGGER_SETTINGS = {
    'SECURITY_DEFINITIONS': {
        'basic': {
            'type': 'basic'
        }
    }
}

GOOGLE_ANALYTICS_NUMBER = ''

TWITTER_IMAGE_URL = ''
TWITTER_SITE = ''
TWITTER_TITLE = ''
TWITTER_USERNAME = ''

SITE_ROOT = 1
# Activate Django-Heroku and deactivate Heroku loggins to activate custom logger.
import django_heroku
django_heroku.settings(locals(), logging=False)
