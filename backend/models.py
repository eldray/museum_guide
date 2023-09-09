from django.db import models
from django.contrib.auth.models import User

from django.conf import settings

CustomUser = settings.AUTH_USER_MODEL

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models



class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    user_type = models.CharField(max_length=20)  # Add this line to define the user_type field

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_type']

    def __str__(self):
        return self.email

from django.conf import settings

class LogEntry(models.Model):
    # ...
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='log_entries')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='backend_logentries')


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
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='user_profile', blank=True, null=True)
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
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='artist_profile', blank=True, null=True)
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

from django.contrib.auth.hashers import make_password

class UserRegistration(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, blank=True, null=True)
    username = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)  

    def save(self, *args, **kwargs):
        self.password = make_password(self.password)  # Hash the password
        super(UserRegistration, self).save(*args, **kwargs)

    def __str__(self):
        return self.username

class ArtistRegistration(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE,blank=True, null=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    ARTIST_TYPES = [
        ('painter', 'Painter'),
        ('sculptor', 'Sculptor'),
        ('graphic designer', 'Graphic Designer'),
        ('textile designer', 'Textile Designer'),
        ('photographer', 'Photographer')
    ]
    artist_type = models.CharField(max_length=100, choices=ARTIST_TYPES)
    biography = models.TextField(blank=True, null=True)
    website = models.URLField(null=True, blank=True)
    facebook = models.URLField(null=True, blank=True)
    twitter = models.URLField(null=True, blank=True)
    instagram = models.URLField(null=True, blank=True)

    def save(self, *args, **kwargs