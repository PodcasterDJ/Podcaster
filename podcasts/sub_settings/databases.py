import os
import dj_database_url

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    if(os.environ['ENV'] == "prod"):
        DEBUG = False
    else:
        DEBUG = True
except:
    DEBUG = True

if DEBUG:
    # Database
    # https://docs.djangoproject.com/en/3.0/ref/settings/#databases
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }

if not DEBUG:
    AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
    AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
    AWS_STORAGE_BUCKET_NAME = os.environ['AWS_STORAGE_BUCKET_NAME']
    if((len(AWS_ACCESS_KEY_ID) + len(AWS_SECRET_ACCESS_KEY) + len(AWS_STORAGE_BUCKET_NAME)) < 4):
        AWS_ACCESS_KEY_ID = os.environ['BUCKETEER_AWS_ACCESS_KEY_ID']
        AWS_SECRET_ACCESS_KEY = os.environ['BUCKETEER_AWS_SECRET_ACCESS_KEY']
        AWS_STORAGE_BUCKET_NAME = os.environ['BUCKETEER_BUCKET_NAME']
    # Database
    # https://docs.djangoproject.com/en/2.2/ref/settings/#databases
    DATABASES = { 'default': dj_database_url.config(
        conn_max_age=600, ssl_require=True) }
    # AWS S3 Amazon Bucket config
    AWS_S3_FILE_OVERWRITE = False
    AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
    AWS_S3_OBJECT_PARAMETERS = {
        'CacheControl': 'max-age=86400',
    }
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
    PUBLIC_MEDIA_LOCATION = 'media'
    MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{PUBLIC_MEDIA_LOCATION}/'
    DEFAULT_FILE_STORAGE = 'podcasts.storage_backends.PublicMediaStorage'