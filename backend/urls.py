from django.urls import path

from django.conf import settings
from django.conf.urls.static import static

from . import views

from .views import (

    ArtistProfileView,
    ExhibitListView,
    ExhibitDetailView,
    ArtworksListView,
    ArtworkDetailView,
    UserProfileView,
    search,
    submit_contact_form,
    AddFavoriteExhibitView,
    RemoveFavoriteExhibitView,
    AddFavoriteArtworkView,
    RemoveFavoriteArtworkView,
    LoginView,
    SubscribeNewsletterView,
    sample_artists_view,
    sample_artworks_view,
)

urlpatterns = [
    path('api/artist-models/', views.ArtistModelList.as_view(), name='artist-model-list'),
    path('api/artworks/', ArtworksListView.as_view(), name='artworks-list'),
    path('api/artworks/<int:id>/', views.ArtworkDetailView.as_view(), name='artwork-detail'),

    path('api/exhibits/', ExhibitListView.as_view(), name='exhibit-list'),
    path('api/exhibits/<int:id>/', ExhibitDetailView.as_view(), name='exhibit-detail'),

    path('api/subscribe_newsletter/', SubscribeNewsletterView.as_view(), name='subscribe-newsletter'),
    
    path('api/user/register/', views.register_user, name='register-user'),
    path('api/user/profile/', UserProfileView.as_view(), name='user-profile'),
    path('api/user/favorites/add/exhibit/<int:exhibit_id>/', AddFavoriteExhibitView.as_view(), name='add-favorite-exhibit'),
    path('api/user/favorites/remove/exhibit/<int:exhibit_id>/', RemoveFavoriteExhibitView.as_view(), name='remove-favorite-exhibit'),
    path('api/user/favorites/add/artwork/<int:artwork_id>/', AddFavoriteArtworkView.as_view(), name='add-favorite-artwork'),
    path('api/user/favorites/remove/artwork/<int:artwork_id>/', RemoveFavoriteArtworkView.as_view(), name='remove-favorite-artwork'),

    path('api/artist/register/', views.register_artist, name='artist-register'),
    path('api/artist/profile/', ArtistProfileView.as_view(), name='artist-profile'),

    path('api/sample-artworks/', sample_artworks_view, name='sample-artworks'),
    path('api/sample-artists/', sample_artists_view, name='sample_artists'),

    path('api/search/', search, name='search'),

    path('api/submit_contact_form/', submit_contact_form, name='submit_contact_form'),  

    path('api/login/', LoginView.as_view(), name='login'),  
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
