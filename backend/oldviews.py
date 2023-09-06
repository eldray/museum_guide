import json
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from .models import Exhibit, Artwork, Artist, User, UserProfile, ArtistProfile
from .serializers import ArtistProfileSerializer, UserProfileSerializer, ExhibitSerializer, ArtworkSerializer, ArtistSerializer, UserSerializer


def index(request):
    context = {}
    return render(request, "index.html", context)

# Profile Views

class ArtistProfileView(generics.RetrieveUpdateAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistProfileSerializer
    # Implement permissions and authentication

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.userprofile

class AddFavoriteView(generics.UpdateAPIView):
    serializer_class = UserProfileSerializer


class ArtworksListView(generics.ListAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer

class ArtworkDetailView(generics.RetrieveAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer
    lookup_field = 'id'

# Artworks Data

import json
from django.http import JsonResponse

def get_sample_artworks(request):
    try:
        with open('./sample_artworks.json') as f:
            sample_artworks = json.load(f)
        return JsonResponse(sample_artworks, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

#Artists

import os
import json
from django.http import JsonResponse
from django.templatetags.static import static
from django.conf import settings

from django.templatetags.static import static

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




import os
import json
from django.http import JsonResponse
from django.templatetags.static import static

def artworks_list_view(request):
    try:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        json_file_path = os.path.join(base_dir, 'data_files', 'artworks.json')

        with open(json_file_path) as f:
            artworks_data = json.load(f)

        for artwork in artworks_data:
            image_path = artwork.get('image_path')
            if image_path:
                artwork['image_url'] = request.build_absolute_uri(static(image_path)) # Generate URL using static tag
        
        return JsonResponse(artworks_data, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


    
# Search Artworks

def search_artworks(request):
    query = request.GET.get('q', '').strip().lower()
    matched_artworks = Artwork.objects.filter(Q(title__icontains=query) | Q(artist__name__icontains=query))
    serializer = ArtworkSerializer(matched_artworks, many=True)
    return JsonResponse(serializer.data, safe=False)

# Artworks

class SampleArtworksView(APIView):
    def get(self, request):
        artworks = Artwork.objects.all()[:6]  # Get the first 6 artworks as sample data
        serializer = ArtworkSerializer(artworks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ExhibitList(generics.ListAPIView):
    queryset = Exhibit.objects.all()
    serializer_class = ExhibitSerializer



from rest_framework import generics
import os
import json
from django.http import JsonResponse
from django.templatetags.static import static

class ArtworksListView(generics.ListAPIView):
    serializer_class = ArtworkSerializer  # Use your actual serializer here

    def get_queryset(self):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        json_file_path = os.path.join(base_dir, 'data_files', 'sample_artworks.json')

        with open(json_file_path) as f:
            artworks = json.load(f)

        for artwork in artworks:
            image_path = artwork.get('image_path')
            if image_path:
                artwork['image_url'] = self.request.build_absolute_uri(static(image_path))

        return artworks




# Registration

class ArtistRegistrationView(generics.CreateAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status

class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Login

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        # Your login logic here
        # Assuming userType is determined after successful login
        user_type = 'artist' if artist else 'user'

        if user_type == 'artist':
            artist_profile_instance = ArtistProfile.objects.get(user_profile__user=request.user)
            serializer = ArtistProfileSerializer(artist_profile_instance)
        else:
            user_profile_instance = UserProfile.objects.get(user=request.user)
            serializer = UserProfileSerializer(user_profile_instance)

        return Response({'user_type': user_type, 'user_profile': serializer.data}, status=status.HTTP_200_OK)

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


# Profile Views

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.userprofile

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


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class SubscribeNewsletterView(APIView):
    def post(self, request):
        email = request.data.get('email')

        # Perform any validation or processing you need for the email
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Here you can add code to store the email in your database or send confirmation emails
        # For example, you might create a NewsletterSubscription model and save the email there.

        # For demonstration purposes, let's just return a success response.
        return Response({'message': 'Subscribed successfully'}, status=status.HTTP_200_OK)



