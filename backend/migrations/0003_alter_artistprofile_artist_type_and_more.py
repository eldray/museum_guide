# Generated by Django 4.2.4 on 2023-08-29 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_remove_artist_artist_type_remove_artist_biography_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='artistprofile',
            name='artist_type',
            field=models.CharField(choices=[('painter', 'Painter'), ('sculptor', 'Sculptor'), ('graphic designer', 'Graphic Designer'), ('textile designer', 'Textile Designer'), ('photographer', 'Photographer')], max_length=20),
        ),
        migrations.AlterField(
            model_name='artistprofile',
            name='profile_pic',
            field=models.ImageField(blank=True, null=True, upload_to='media/artist_profile_pics/'),
        ),
        migrations.AlterField(
            model_name='artistprofile',
            name='social_media',
            field=models.CharField(blank=True, choices=[('facebook', 'Facebook'), ('twitter', 'Twitter'), ('tiktok', 'TikTok'), ('instagram', 'instagram'), ('youtube', 'youtube'), ('linkedin', 'linkedin')], max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='artwork',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='interests',
            field=models.CharField(blank=True, choices=[('sculpture', 'Sculpture'), ('paintings', 'Paintings')], max_length=20),
        ),
    ]
