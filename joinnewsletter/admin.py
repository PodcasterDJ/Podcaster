from django.contrib import admin

# Register your models here.

from .models import Join

class JoinAdmin(admin.ModelAdmin):
    list_display = ('email', 'timestamp')
admin.site.register(Join, JoinAdmin)