# Generated by Django 4.2.4 on 2023-09-06 08:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0013_artwork_by_artist'),
    ]

    operations = [
        migrations.CreateModel(
            name='Movements',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('artists', models.CharField(blank=True, max_length=100, null=True)),
                ('image', models.ImageField(upload_to='movement_images/')),
            ],
        ),
    ]