from rest_framework import serializers
from .models import ArtistProfile, UserProfile, Exhibit, Artwork, Artist, User, Movements

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__'

class MovementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movements
        fields = '__all__'

class ExhibitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exhibit
        fields = '__all__'


class ArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = ['id', 'title', 'artist', 'description', 'image', 'price']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    interests = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = '__all__'

    def get_interests(self, instance):
        return instance.interests.split(',') if instance.interests else []
    

from rest_framework import serializers
from .models import UserRegistration

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRegistration
        fields = ['username', 'email', 'password']


class UserLoginSerializer(serializers.Serializer):
    pass

from rest_framework import serializers
from .models import ArtistRegistration

class ArtistRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistRegistration
        fields = ['name', 'email', 'artist_type', 'biography', 'website', 'facebook', 'twitter', 'instagram']

    
class ArtistProfileSerializer(serializers.ModelSerializer):
    artist_type_display = serializers.CharField(source='get_artist_type_display', read_only=True)
    website = serializers.URLField(allow_blank=True, allow_null=True)

    class Meta:
        model = ArtistProfile
        fields = '__all__'
        read_only_fields = ['user_profile']  # Prevent updating this field on serialization
