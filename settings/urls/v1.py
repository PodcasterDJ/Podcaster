from django.urls import include, path
from rest_framework import routers
from blog.views import PostViewSet, PostDetailViewSet

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'postsdetails', PostDetailViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
