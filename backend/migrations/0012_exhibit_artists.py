# Generated by Django 4.2.4 on 2023-09-05 11:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0011_alter_artist_art_medium'),
    ]

    operations = [
        migrations.AddField(
            model_name='exhibit',
            name='artists',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]