import json
from django.core.management.base import BaseCommand
from django.conf import settings
from backend.models import Artwork, Artist 

class Command(BaseCommand):
    help = 'Load data from JSON file to Artwork model'

    def handle(self, *args, **kwargs):
        json_file_path = settings.BASE_DIR / 'backend' / 'data_files' / 'artworks.json' 

        with open(json_file_path) as f:
            artworks_data = json.load(f)

        for artwork_data in artworks_data:
            artist_id = artwork_data.pop('artist', 1)  # Replace 1 with the actual ID of the default artist
            artist = Artist.objects.get(id=artist_id)  # Retrieve the Artist instance
            artwork = Artwork(artist=artist, **artwork_data)  # Associate the artist with the artwork
            artwork.save()

            

        self.stdout.write(self.style.SUCCESS('Data loaded successfully.'))
