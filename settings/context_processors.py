from .models import SocialMediaLink, PageDescription, PageBackground

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
def page_background(request):
    return {
        "page_background": PageBackground.objects.all(),
    }
def SEO_info(request):
    pass