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
        'artists': MovementSerializer(matched_movements, many=True).data,
    }
    
    return JsonResponse(search_results)


from rest_framework import generics
from .models import UserRegistration
from .serializers import UserRegistrationSerializer

class UserRegistrationCreateView(generics.CreateAPIView):
    queryset = UserRegistration.objects.all()
    serializer_class = UserRegistrationSerializer

from rest_framework import generics
from .models import ArtistRegistration
from .serializers import ArtistRegistrationSerializer

class ArtistRegistrationCreateView(generics.CreateAPIView):
    queryset = ArtistRegistration.objects.all()
    serializer_class = ArtistRegistrationSerializer


from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate

class UserLoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)

        if user:
            return Response({'user_type': user.user_type}, status=status.HTTP_200_OK)
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


