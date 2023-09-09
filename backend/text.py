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


