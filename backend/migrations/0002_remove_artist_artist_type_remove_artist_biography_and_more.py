# Generated by Django 4.2.4 on 2023-08-20 04:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='artist',
            name='artist_type',
        ),
        migrations.RemoveField(
            model_name='artist',
            name='biography',
        ),
        migrations.RemoveField(
            model_name='artist',
            name='email',
        ),
        migrations.RemoveField(
            model_name='artist',
            name='name',
        ),
        migrations.RemoveField(
            model_name='artist',
            name='profile_pic',
        ),
        migrations.RemoveField(
            model_name='artist',
            name='social_media',
        ),
        migrations.RemoveField(
            model_name='artist',
            name='website',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='address',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='biography',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='date_of_birth',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='interests',
            field=models.CharField(blank=True, choices=[('sculpture', 'Sculpture'), ('paintings', 'Paintings'), ('drawings', 'Drawings'), ('modern_art', 'Modern Art')], max_length=20),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='phone_number',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='profile_picture',
            field=models.ImageField(blank=True, null=True, upload_to='profile_pics/'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='social_media',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='website',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.CreateModel(
            name='ArtistProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('artist_type', models.CharField(choices=[('painter', 'Painter'), ('sculptor', 'Sculptor'), ('other', 'Other')], max_length=10)),
                ('biography', models.TextField()),
                ('website', models.URLField(blank=True, null=True)),
                ('social_media', models.CharField(blank=True, max_length=200, null=True)),
                ('profile_pic', models.ImageField(blank=True, null=True, upload_to='artist_profile_pics/')),
                ('user_profile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='backend.userprofile')),
            ],
        ),
    ]
