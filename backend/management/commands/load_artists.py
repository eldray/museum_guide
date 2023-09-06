import json
from django.core.management.base import BaseCommand
from django.conf import settings
from backend.models import Artist 

class Command(BaseCommand):
    help = 'Load data from JSON file to Artist model'

    def handle(self, *args, **kwargs):
        json_file_path = settings.BASE_DIR / 'backend' / 'data_files' / 'artists.json'

        with open(json_file_path, 'r', encoding='utf-8-sig') as f:
            artists_data = json.load(f)

        for artist_data in artists_data:
            artist = Artist(**artist_data)
            artist.save()

        self.stdout.write(self.style.SUCCESS('Data loaded successfully.'))
