# Generated by Django 4.2.4 on 2023-09-06 08:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0012_exhibit_artists'),
    ]

    operations = [
        migrations.AddField(
            model_name='artwork',
            name='by_artist',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
