# Generated by Django 4.2.4 on 2023-09-05 01:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0007_artist_image_path'),
    ]

    operations = [
        migrations.AlterField(
            model_name='artist',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
