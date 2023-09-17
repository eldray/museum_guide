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
from .models import Exhibit, Artwork, Artist, Movements, User, UserProfile, ArtistProfile
from .serializers import (
    ArtistProfileSerializer,
    UserProfileSerializer,
    ArtworkSerializer,
    ExhibitSerializer,
    MovementSerializer,
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
        
        # Here you can add code to store the email in your database or send confirmation
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
from rest_framework import generics
from .models import Exhibit, Artwork
from .serializers import ExhibitSerializer, ArtworkSerializer
import os
import json
from rest_framework.response import Response

class MovementsView(generics.ListAPIView):
    queryset = Movements.objects.all()
    serializer_class = MovementSerializer

class ExhibitDetailView(generics.RetrieveAPIView):
    queryset = Exhibit.objects.all()
    serializer_class = ExhibitSerializer
    lookup_field = 'id'

class ExhibitListView(generics.ListAPIView):
    queryset = Exhibit.objects.all()
    serializer_class = ExhibitSerializer

class ArtworkDetailView(generics.RetrieveAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer
    lookup_field = 'id'

class ArtworksListView(generics.ListAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer

class ArtistModelList(generics.ListAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer


# Search Artworks

def search(request):
    query = request.GET.get('q', '').strip().lower()
    
    # Search across multiple models
    matched_artworks = Artwork.objects.filter(Q(title__icontains=query) | Q(artist__name__icontains=query))
    matched_exhibits = Exhibit.objects.filter(title__icontains=query)
    matched_artists = Artist.objects.filter(name__icontains=query)
    matched_movements = Movements.objects.filter(title__icontains=query)

    # Combine and serialize the results
    search_results = {
        'artworks': ArtworkSerializer(matched_artworks, many=True).data,
        'exhibits': ExhibitSerializer(matched_exhibits, many=True).data,
        'artists': ArtistSerializer(matched_artists, many=True).data,
        'movements': MovementSerializer(matched_movements, many=True).data,
    }
    
    return JsonResponse(search_results)



from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

class MyAuthenticatedView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Your view logic here
        return Response({"message": "Authenticated view"})

from rest_framework import generics
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from .models import UserRegistration, ArtistRegistration
from .serializers import UserRegistrationSerializer, ArtistRegistrationSerializer

from rest_framework.authtoken.models import Token

class UserRegistrationCreateView(generics.CreateAPIView):
    queryset = UserRegistration.objects.all()
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        if response.status_code == 201:  # If user registration is successful
            # Automatically log in the user
            user = response.data.get('user')  # Get the user instance from the response data
            if user is not None:
                login(request, user)
                token, _ = Token.objects.get_or_create(user=user)
                response.data['token'] = token.key

        return response


# Add similar code to ArtistRegistrationCreateView

class ArtistRegistrationCreateView(generics.CreateAPIView):
    queryset = ArtistRegistration.objects.all()
    serializer_class = ArtistRegistrationSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        if response.status_code == 201:  # If artist registration is successful
            # Automatically log in the artist
            artist = self.perform_authentication(request)
            if artist is not None:
                login(request, artist)
                token, _ = Token.objects.get_or_create(user=artist)
                response.data['token'] = token.key

        return response

    def perform_authentication(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        artist = authenticate(request, username=email, password=password)
        return artist



from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate, login

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class UserLoginView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, username=email, password=password)

        if user is not None and not hasattr(user, 'artist'):
            login(request, user)
            user_profile_instance = user.userprofile
            serializer = UserProfileSerializer(user_profile_instance)
            return Response({'user_type': 'user', 'user_profile': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login

class ArtistLoginView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        artist = authenticate(request, username=email, password=password)

        if artist is not None and hasattr(artist, 'artist'):
            login(request, artist)
            artist_profile_instance = artist.artist
            serializer = ArtistProfileSerializer(artist_profile_instance)
            return Response({'user_type': 'artist', 'user_profile': serializer.data}, status=status.HTTP_200_OK)
        else:
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
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.artistprofile

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.userprofile


# Favorites Management

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Exhibit, Artwork
from .serializers import ExhibitSerializer, ArtworkSerializer

class FavoritesView(APIView):
    def get(self, request):
        # Fetch favorite exhibits and artworks for the authenticated user
        user = request.user
        favorite_exhibits = Exhibit.objects.filter(favorites=user)
        favorite_artworks = Artwork.objects.filter(favorites=user)
        
        exhibit_serializer = ExhibitSerializer(favorite_exhibits, many=True)
        artwork_serializer = ArtworkSerializer(favorite_artworks, many=True)
        
        return Response({
            'favoriteExhibits': exhibit_serializer.data,
            'favoriteArtworks': artwork_serializer.data,
        }, status=status.HTTP_200_OK)

    def delete(self, request, type, id):
        # Remove exhibit or artwork from user's favorites
        user = request.user
        if type == 'exhibit':
            exhibit = Exhibit.objects.get(pk=id)
            user.favorites.remove(exhibit)
        elif type == 'artwork':
            artwork = Artwork.objects.get(pk=id)
            user.favorites.remove(artwork)
        
        return Response(status=status.HTTP_204_NO_CONTENT)


# User Actions
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


