import os
# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
try:
    if(os.environ['ENV'] == "prod"):
        DEBUG = False
except:
    DEBUG = True

if DEBUG:
    SECURE_SSL_REDIRECT = False
    # Database
    # https://docs.djangoproject.com/en/3.0/ref/settings/#databases

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }


if not DEBUG:
    # Database
    # https://docs.djangoproject.com/en/2.2/ref/settings/#databases
    
    DB_NAME = os.environ['DB_NAME']
    DB_USER = os.environ['DB_USER']
    DB_PASS = os.environ['DB_PASS']
    DB_HOST = os.environ['DB_HOST']
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            # Database name
            'NAME': DB_NAME,
            'USER': DB_USER,
            'PASSWORD': DB_PASS,
            'HOST': DB_HOST,  # Or an IP Address that your DB is hosted on

        }
    }

    # AWS
    # S3 Amazon Buscket config
    AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
    AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
    AWS_STORAGE_BUCKET_NAME = os.environ['AWS_STORAGE_BUCKET_NAME']
    AWS_S3_FILE_OVERWRITE = False
    AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
    AWS_S3_OBJECT_PARAMETERS = {
        'CacheControl': 'max-age=86400',
    }

    # s3 static settings
    # PUBLIC_STATIC_LOCATION = 'static'
    #STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{PUBLIC_STATIC_LOCATION}/'
    #STATICFILES_STORAGE = 'podcasts.storage_backends.StaticStorage'
    # Simplified static file serving.
    # https://warehouse.python.org/project/whitenoise/
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
    # s3 public media settings
    PUBLIC_MEDIA_LOCATION = 'media'
    MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{PUBLIC_MEDIA_LOCATION}/'
    DEFAULT_FILE_STORAGE = 'podcasts.storage_backends.PublicMediaStorage'

    SECURE_SSL_REDIRECT = False
    DATABASES['default'] = dj_database_url.config(
        conn_max_age=600, ssl_require=True)
