from django.contrib.auth.models import User

from .models import Post
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ('author', 'title', 'overview', 'content',
                  'timestamp', 'publish', 'thumbnail')
