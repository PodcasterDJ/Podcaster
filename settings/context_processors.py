from .models import SocialMediaLink, PageDescription

# TODO: Wire data from models/admin through context processors

# Settings

# Page data
def page_description(request):
    return {
        "page_description": PageDescription.objects.all(),
    }
# Social media
def social_media(request):
    
    return {
        "social_media": SocialMediaLink.objects.all(),
    }
# Backgrounds

# Colors