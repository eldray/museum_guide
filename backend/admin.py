from django.contrib import admin
from .models import Exhibit, Artwork, UserProfile

admin.site.register(Exhibit)
admin.site.register(Artwork)
admin.site.register(UserProfile)
