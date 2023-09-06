import os
import json
from django.contrib.auth import authenticate
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.templatetags.static import static
from django.db.models import Q
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Exhibit, Artwork, Artist, User, UserProfile, ArtistProfile
from .serializers import (
    ArtistProfileSerializer,
    UserProfileSerializer,
    ArtworkSerializer,
    ExhibitSerializer,
    ArtistSerializer,
    UserSerializer,
)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from .serializers import ArtistSerializer, UserSerializer


# React Frontend

def index(request):
    context = {}
    return render(request, "index.html", context)


# Contact form

def submit_contact_form(request):
    if request.method == 'POST':
        # Retrieve form data from request.POST dictionary
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        
        # Process the form data (e.g., send an email, store in the database, etc.)
        
        return JsonResponse({'message': 'Form submitted successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

class SubscribeNewsletterView(APIView):
    def post(self, request):
        email = request.data.get('email')

        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Here you can add code to store the email in your database or send confirmation emails
        # For example, you might create a NewsletterSubscription model and save the email there.

        # For demonstration purposes, let's just return a success response.
        return Response({'message': 'Subscribed successfully'}, status=status.HTTP_200_OK)

# ... Artists and Artworks View

def sample_artworks_view(request):
    try:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        json_file_path = os.path.join(base_dir, 'data_files', 'sample_artworks.json')

        with open(json_file_path) as f:
            sample_artworks = json.load(f)
        
        for artwork in sample_artworks:
            image_path = artwork.get('image_path')
            if image_path:
                artwork['image_url'] = request.build_absolute_uri(static(image_path))
        
        return JsonResponse(sample_artworks, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def sample_artists_view(request):
    try:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        json_file_path = os.path.join(base_dir, 'data_files', 'sample_artists.json')

        with open(json_file_path) as f:
            sample_artists = json.load(f)

        for artist in sample_artists:
            image_path = artist.get('image_path')
            if image_path:
                artist['image_url'] = request.build_absolute_uri(static(image_path)) # Generate URL using static tag
        
        return JsonResponse(sample_artists, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

# ... Exhibits

class ExhibitDetailView(generics.RetrieveAPIView):
    queryset = Exhibit.objects.all()
    serializer_class = ExhibitSerializer
    lookup_field = 'id'

class ExhibitListView(generics.ListAPIView):
    queryset = Exhibit.objects.all()
    serializer_class = ExhibitSerializer

    def get_queryset(self):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        json_file_path = os.path.join(base_dir, 'data_files', 'exhibits.json')

        with open(json_file_path) as f:
            exhibits_data = json.load(f)

        for exhibit in exhibits_data:
            image_path = exhibit.get('image_path')
            if image_path:
                exhibit['image_url'] = self.request.build_absolute_uri(static(image_path))
        
        return JsonResponse(exhibits_data, safe=False)

# ... Artworks

class ArtworkDetailView(generics.RetrieveAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer
    lookup_field = 'id'

from rest_framework import generics
import os
import json
from rest_framework.response import Response
from .serializers import ArtworkSerializer
from .models import Artwork  # Import your Artwork model

from rest_framework import generics
from rest_framework.response import Response
from .models import Artwork
from .serializers import ArtworkSerializer

class ArtworksListView(generics.ListAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer

    def list(self, request, *args, **kwargs):
        # Get the queryset of Artwork instances
        queryset = self.get_queryset()

        # Serialize the queryset using the ArtworkSerializer
        serializer = self.get_serializer(queryset, many=True)

        # Return the serialized data as a JSON response
        return Response(serializer.data)



# Search Artworks

def search_artworks(request):
    query = request.GET.get('q', '').strip().lower()
    matched_artworks = Artwork.objects.filter(Q(title__icontains=query) | Q(artist__name__icontains=query))
    serializer = ArtworkSerializer(matched_artworks, many=True)
    return JsonResponse(serializer.data, safe=False)

# ... Registration Views

        



@api_view(['POST'])
@permission_classes([AllowAny])
def register_artist(request):
    User = get_user_model()
    data = request.data
    
    # Perform server-side validation
    serializer = ArtistSerializer(data=data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Check if the email is already registered
    email = data.get('email')
    if User.objects.filter(email=email).exists():
        return Response({'message': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)

    # Create a new user profile and artist
    try:
        user = User.objects.create(
            username=data['email'],  # You can set the username as the email
            email=email,
            password=User.objects.make_random_password(),  # Generate a random password
        )
        artist = Artist.objects.create(
            user_profile=user,
            name=data['name'],
            email=email,
            artist_type=data['artist_type'],
            biography=data['biography'],
            website=data['website'],
            social_media=data['social_media'],
        )
        return Response({'message': 'Artist registered successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    User = get_user_model()
    data = request.data
    
    # Perform server-side validation
    serializer = UserSerializer(data=data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Check if the email is already registered
    email = data.get('email')
    if User.objects.filter(email=email).exists():
        return Response({'message': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)

    # Create a new user
    try:
        user = User.objects.create_user(
            username=data['username'],
            email=email,
            password=data['password'],
        )
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ... Login View


from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from .serializers import ArtistProfileSerializer, UserProfileSerializer

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Authenticate the user based on email and password
        user = authenticate(request, username=email, password=password)

        if user is not None:
            # Authentication successful
            login(request, user)  # Log in the user

            if hasattr(user, 'artist'):
                user_type = 'artist'
                artist_profile_instance = user.artist
                serializer = ArtistProfileSerializer(artist_profile_instance)
            else:
                user_type = 'user'
                user_profile_instance = user.userprofile
                serializer = UserProfileSerializer(user_profile_instance)

            return Response({'user_type': user_type, 'user_profile': serializer.data}, status=status.HTTP_200_OK)
        else:
            # Authentication failed
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)



# ...

class AddFavoriteExhibitView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, exhibit_id):
        user_profile = request.user.userprofile
        exhibit = get_object_or_404(Exhibit, id=exhibit_id)
        user_profile.favorites.add(exhibit)
        user_profile.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


# ... Profile Views

class ArtistProfileView(generics.RetrieveUpdateAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistProfileSerializer
    # Implement permissions and authentication

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.userprofile


# ... User Actions

class AddFavoriteExhibitView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, exhibit_id):
        user_profile = request.user.userprofile
        exhibit = get_object_or_404(Exhibit, id=exhibit_id)
        user_profile.favorites.add(exhibit)
        user_profile.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class RemoveFavoriteExhibitView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, exhibit_id):
        user_profile = request.user.userprofile
        exhibit = get_object_or_404(Exhibit, id=exhibit_id)
        user_profile.favorites.remove(exhibit)
        user_profile.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class AddFavoriteArtworkView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, artwork_id):
        user_profile = request.user.userprofile
        artwork = get_object_or_404(Artwork, id=artwork_id)
        user_profile.favorites.add(artwork)
        user_profile.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class RemoveFavoriteArtworkView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, artwork_id):
        user_profile = request.user.userprofile
        artwork = get_object_or_404(Artwork, id=artwork_id)
        user_profile.favorites.remove(artwork)
        user_profile.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


