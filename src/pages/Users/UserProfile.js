import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArtworksList from '../ArtWorks/ArtworksList';  
import ExhibitsList from '../ArtWorks/ExhibitsList';
import Favorites from './Favorites';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/user/profile/');
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEdit = () => {
    setEditing(true);
    setUpdatedData({
      name: userData.name,
      email: userData.email,
      preferredArts: userData.preferredArts,
      // Add more fields to update
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.patch('/api/user/profile/', updatedData);
      setEditing(false);
      // Refresh user data
      const response = await axios.get('/api/user/profile/');
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePopupClose = () => {
    setEditing(false);
  };

  const handleAddFavorite = async (itemId) => {
    try {
      await axios.post(`/api/user/favorites/add/${itemId}/`);
      // Refresh user data
      const response = await axios.get('/api/user/profile/');
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFavorite = async (itemId) => {
    try {
      await axios.post(`/api/user/favorites/remove/${itemId}/`);
      // Refresh user data
      const response = await axios.get('/api/user/profile/');
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex p-4 space-x-8 mt-24">
      <div className="w-1/4 bg-red-500 p-5 text-white">
        {userData ? (
          <div>
            <div className="mb-4">
              <h2 className="bg-gray-200 p-2">User Profile</h2>
              <p>Name: {userData.name}</p>
              <p>Email: {userData.email}</p>
              <p>Preferred Arts: {userData.preferredArts}</p>
              <button onClick={handleEdit} className="bg-red-700 px-2 py-1 mt-2">
                Edit
              </button>
            </div>

            <h2 className="bg-gray-400 p-2 mt-4">Your Favorites</h2>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="w-3/4">
        {editing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4">
              <h2 className="bg-ash p-2">Edit Profile</h2>
              <form>
              {/* Add your input fields for profile editing here */}
            
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  defaultValue={userData?.name}
                  className="border rounded p-1"
                />
              </label>
              <label>
                Biography:
                <textarea
                  name="biography"
                  defaultValue={userData?.biography}
                  className="border rounded p-1"
                />
              </label>
              <label>
                Profile Picture:
                <input
                  type="file"
                  accept="image/*"
                  name="profilePicture"
                  className="border rounded p-1"
                />
              </label>
              
                {/*input fields for profile editing here */}
                <button type="button" onClick={handleUpdate} className="bg-red-700 px-2 py-1 mt-2">
          Save
                </button>
                <button type="button" onClick={handlePopupClose} className="mt-2">
          Cancel
                </button>
              
              <button type="button" onClick={handleUpdate} className="bg-red-700 px-2 py-1 mt-2">
                Save
              </button>
              <button type="button" onClick={handlePopupClose}
              className="mt-2">
                Cancel
              </button>
            </form>
            </div>
          </div>
        )}

          <Favorites/>
        <div>
          <h3 className="bg-ash p-2">Exhibits</h3>
          <ul>
            {userData?.favoriteExhibits.map((exhibit) => (
              <li key={exhibit.id} className="flex items-center justify-between p-2">
                <span>{exhibit.title}</span>
                <button
                  onClick={() => handleAddFavorite(exhibit.id)}
                  className="text-red-700 hover:text-black"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="bg-ash p-2 mt-4">Artworks</h3>
          <ArtworksList />
          <ul>
            {userData?.favoriteArtworks.map((artwork) => (
              <li key={artwork.id} className="flex items-center justify-between p-2">
                <span>{artwork.title}</span>
                <button
                  onClick={() => handleRemoveFavorite(artwork.id)}
                  className="text-red-700 hover:text-black"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
