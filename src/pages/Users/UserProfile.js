import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div className="flex p-4 space-x-8">
      <div className="w-1/2 bg-red-500 p-4 text-white">
        {userData ? (
          <div>
            {editing ? (
              <div>
                <h2 className="bg-ash p-2">Edit Profile</h2>
                <label>Name: </label>
                <input
                  type="text"
                  value={updatedData.name}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, name: e.target.value })
                  }
                  className="border rounded p-1"
                />
                {/* Add more input fields for other data */}
                <button onClick={handleUpdate} className="bg-red-700 px-2 py-1 mt-2">
                  Save
                </button>
              </div>
            ) : (
              <div>
                <h2 className="bg-ash p-2">User Profile</h2>
                <p>Name: {userData.name}</p>
                <p>Email: {userData.email}</p>
                <p>Preferred Arts: {userData.preferredArts}</p>
                {/* Add more user-specific information */}
                <button onClick={handleEdit} className="bg-red-700 px-2 py-1 mt-2">
                  Edit
                </button>
              </div>
            )}

            <h2 className="bg-ash p-2 mt-4">Your Favorites</h2>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="w-1/2">
        <div>
          <h3 className="bg-ash p-2">Exhibits</h3>
          <ul>
            {userData?.favoriteExhibits.map((exhibit) => (
              <li key={exhibit.id} className="flex items-center justify-between p-2">
                <span>{exhibit.title}</span>
                <button
                  onClick={() => handleRemoveFavorite(exhibit.id)}
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
