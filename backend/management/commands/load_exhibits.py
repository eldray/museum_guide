import json
from django.core.management.base import BaseCommand
from django.conf import settings
from backend.models import Exhibit

class Command(BaseCommand):
    help = 'Load data from JSON file to Exhibit model'

    def handle(self, *args, **kwargs):
        json_file_path = settings.BASE_DIR / 'backend' / 'data_files' / 'exhibits.json'

        with open(json_file_path) as f:
            exhibits_data = json.load(f)

        for exhibit_data in exhibits_data:
            exhibit = Exhibit(**exhibit_data)
            exhibit.save()

        self.stdout.write(self.style.SUCCESS('Data loaded successfully.'))
