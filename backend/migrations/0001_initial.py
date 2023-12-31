# Generated by Django 4.2.4 on 2023-08-19 00:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('artist_type', models.CharField(choices=[('painter', 'Painter'), ('sculptor', 'Sculptor'), ('other', 'Other')], max_length=10)),
                ('biography', models.TextField()),
                ('website', models.URLField(blank=True, null=True)),
                ('social_media', models.CharField(blank=True, max_length=200, null=True)),
                ('profile_pic', models.ImageField(blank=True, null=True, upload_to='artist_profile_pics/')),
            ],
        ),
        migrations.CreateModel(
            name='Exhibit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('image', models.ImageField(upload_to='exhibit_images/')),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_artist', models.BooleanField(default=False)),
                ('favorites', models.ManyToManyField(blank=True, to='backend.exhibit')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Artwork',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('image', models.ImageField(upload_to='artwork_images/')),
                ('price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('artist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.artist')),
            ],
        ),
        migrations.AddField(
            model_name='artist',
            name='user_profile',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='backend.userprofile'),
        ),
    ]
