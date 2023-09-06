import json
from django.core.management.base import BaseCommand
from django.conf import settings
from backend.models import Movements 

class Command(BaseCommand):
    help = 'Load data from JSON file to Movements model'

    def handle(self, *args, **kwargs):
        json_file_path = settings.BASE_DIR / 'backend' / 'data_files' / 'movement.json'

        with open(json_file_path) as f:
            movements_data = json.load(f)

        for movement_data in movements_data:
            movement = Movements(**movement_data)
            movement.save()

        self.stdout.write(self.style.SUCCESS('Data loaded successfully.'))
