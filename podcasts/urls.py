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
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf.urls.i18n import i18n_patterns
from home.views import redirectHome
from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache


urlpatterns = [ 
    path('admin/', admin.site.urls),
]
urlpatterns = [
    #path('', redirectHome),
    # path('', include("home.urls", namespace='home')),
    re_path('',  TemplateView.as_view(template_name="index.html")),
    path('podcasts', include("episodes.urls", namespace='episodes')),
    # This namespace corresponds to save method for slug in models
    path('blog', include("blog.urls", namespace='blog')),
    path('about', include("about.urls", namespace='about')),
    path('joinnewsletter/', include('joinnewsletter.urls', namespace='joinnewsletter')),
    path('summernote/', include('django_summernote.urls')),
    ]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

# Adding main URL for FrontEnd app
# urlpatterns += [re_path('.*', never_cache(TemplateView.as_view(template_name="index.html")))]

admin.site.site_header = "Podcasts Admin"
admin.site.site_title = "Podcasts Admin Portal"
admin.site.index_title = "Welcome to Podcasts Portal"