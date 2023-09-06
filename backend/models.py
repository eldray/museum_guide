from django.db import models
from django.contrib.auth.models import User

class Exhibit(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='exhibit_images/')
    start_date = models.DateField()
    end_date = models.DateField()
    artists = models.CharField(max_length=100, blank=True, null=True)

class Movements(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    artists = models.CharField(max_length=100, blank=True, null=True)
    image = models.ImageField(upload_to='movement_images/')

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    favorites = models.ManyToManyField(Exhibit, blank=True)  
    date_of_birth = models.DateField(blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    biography = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    social_media = models.CharField(max_length=200, blank=True, null=True)

    INTEREST_CHOICES = [
        ('sculpture', 'Sculpture'),
        ('paintings', 'Paintings'),              


        # Add more choices as needed
    ]

    interests = models.CharField(max_length=20, choices=INTEREST_CHOICES, blank=True)

    def __str__(self):
        return self.user.username


class ArtistProfile(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    ARTIST_TYPES = [
        ('painter', 'Painter'),
        ('sculptor', 'Sculptor'),
        ('graphic designer', 'Graphic Designer'),
        ('textile designer', 'Textile Designer'),
        ('photographer', 'Photographer')
    ]
    artist_type = models.CharField(max_length=20, choices=ARTIST_TYPES)
    biography = models.TextField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    
    FACEBOOK = 'facebook'
    TWITTER = 'twitter'
    TIKTOK = 'tiktok'
    INSTAGRAM = 'instagram'
    YOUTUBE = 'youtube'
    LINKEDIN = 'linkedin'
    # Add more social media options as needed
    
    SOCIAL_MEDIA_CHOICES = [
        (FACEBOOK, 'Facebook'),
        (TWITTER, 'Twitter'),
        (TIKTOK, 'TikTok'),
        (INSTAGRAM, 'instagram'),
        (YOUTUBE, 'youtube'),
        (LINKEDIN, 'linkedin')
    ]
    
    social_media = models.CharField(
        max_length=10,
        choices=SOCIAL_MEDIA_CHOICES,
        blank=True,
        null=True
    )
    
    profile_pic = models.ImageField(upload_to='media/artist_profile_pics/', blank=True, null=True)

    def __str__(self):
        return self
    
class Artist(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True)
    email = models.EmailField(null=True)
    art_medium = models.CharField(max_length=100, null=True)
    art_movement = models.CharField(max_length=100, null=True)
    biography = models.TextField(null=True)
    years_active = models.CharField(max_length=100,blank=True, null=True)
    image_path = models.ImageField(upload_to='media/artist_profile_pics/', blank=True, null=True)

class Artwork(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    by_artist = models.CharField(max_length=100,blank=True, null=True)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    description = models.TextField()
    image = models.ImageField(upload_to='artwork_images/')
    price = models.DecimalField(max_digits=8, decimal_places=2)
    # Add more fields as needed
