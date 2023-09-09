import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArtistProfile = () => {
  const [artistData, setArtistData] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [newArtwork, setNewArtwork] = useState({ title: '', image: null });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await axios.get('/api/artist/profile/');
        setArtistData(response.data);
        setArtworks(response.data.artworks);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArtistData();
  }, []);

  const handleArtworkSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', newArtwork.title);
    formData.append('image', newArtwork.image);

    try {
      const response = await axios.post('/api/artwork/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update artworks state
      setArtworks([...artworks, response.data]);
      setNewArtwork({ title: '', image: null });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4 bg-red-500 p-4 text-white">
        <h2 className="bg-ash p-2">Artist Profile</h2>
        <p>Name: {artistData?.name}</p>
        <p>Email: {artistData?.email}</p>
        <p>Type of Artist: {artistData?.artistType}</p>
        <p>Biography: {artistData?.biography}</p>
        <p>Website: {artistData?.website}</p>
        <p>Social Media: {artistData?.socialMedia}</p>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-red-700 px-2 py-1 mt-2"
        >
          Update Profile
        </button>
      </div>
      <div className="w-3/4 p-4">
        <h2 className="bg-ash p-2">Your Artworks</h2>
        <form onSubmit={handleArtworkSubmit} className="mb-4">
          <label>
            Title:
            <input
              type="text"
              value={newArtwork.title}
              onChange={(e) => setNewArtwork({ ...newArtwork, title: e.target.value })}
              className="border rounded p-1"
            />
          </label>
          <label>
            Image:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewArtwork({ ...newArtwork, image: e.target.files[0] })}
              className="border rounded p-1"
            />
          </label>
          <button type="submit" className="bg-red-700 px-2 py-1 ml-2 text-white">
            Add Artwork
          </button>
        </form>
        <div className="grid grid-cols-2 gap-4">
          {artworks.map((artwork) => (
            <div key={artwork.id} className="border p-2">
              <img src={artwork.image} alt={artwork.title} className="w-full" />
              <p>{artwork.title}</p>
            </div>
          ))}
        </div>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4">
            {/* Update profile form */}
            {/* You can create the form inputs here */}
            <button onClick={() => setIsPopupOpen(false)} className="mt-2">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistProfile;
