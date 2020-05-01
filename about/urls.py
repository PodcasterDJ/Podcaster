from django.urls import path
from .apiviews import GeneralInfoApiListView

app_name = 'about'

# API URLs
urlpatterns = [
    # Show all posts
    path("", GeneralInfoApiListView.as_view(), name="about")
]

# Old template views.
# urlpatterns = [
#     path('', AboutView.as_view(), name='about'),
# ]
