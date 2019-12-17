from .models import SocialMediaLink

# TODO: Wire data from models/admin through context processors

# Settings

# Page data

# Social media
def social_media(request):
    
    return {
        "social_media": SocialMediaLink.objects.all(),
    }
# Backgrounds

# Colors