# Generated by Django 4.2.4 on 2023-09-03 19:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_alter_artistprofile_artist_type_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='artist',
            name='artist_type',
            field=models.CharField(blank=True, choices=[('painter', 'Painter'), ('sculptor', 'Sculptor'), ('graphic designer', 'Graphic Designer'), ('textile designer', 'Textile Designer'), ('photographer', 'Photographer')], max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='artist',
            name='biography',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='artist',
            name='email',
            field=models.EmailField(max_length=254, null=True),
        ),
        migrations.AddField(
            model_name='artist',
            name='name',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='artist',
            name='social_media',
            field=models.CharField(blank=True, choices=[('facebook', 'Facebook'), ('twitter', 'Twitter'), ('tiktok', 'TikTok'), ('instagram', 'instagram'), ('youtube', 'youtube'), ('linkedin', 'linkedin')], max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='artist',
            name='website',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='artistprofile',
            name='biography',
            field=models.TextField(blank=True, null=True),
        ),
    ]