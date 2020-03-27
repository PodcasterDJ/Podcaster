"""podcasts URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf.urls.i18n import i18n_patterns
from home.views import redirectHome

urlpatterns = [
    #url(r'^(?P<filename>(robots.txt)|(humans.txt))$',
    #   home_files, name='home-files'),
    path('admin/', admin.site.urls),
]
urlpatterns += i18n_patterns(
    #path('', redirectHome),
    path('', include("home.urls", namespace='home')),
    path('episodes', include("episodes.urls", namespace='episodes')),
    path('blog', include("blog.urls", namespace='blog')),
    path('about', include("about.urls", namespace='about')),
    path('joinnewsletter/', include('joinnewsletter.urls', namespace='joinnewsletter')),
    )
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

admin.site.site_header = "Podcasts Admin"
admin.site.site_title = "Podcasts Admin Portal"
admin.site.index_title = "Welcome to Podcasts Portal"