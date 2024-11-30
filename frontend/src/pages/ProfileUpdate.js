// pages/ProfileUpdate.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileForm from '../components/ProfileForm';

const ProfileUpdate = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    bio: '',
    contactDetails: '',
    profilePicture: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfileData((prev) => ({
      ...prev,
      profilePicture: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      for (const key in profileData) {
        formData.append(key, profileData[key]);
      }

      const token = localStorage.getItem('token');
      console.log(profileData);
      await axios.put('/api/user/profile', profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setMessage('Profile updated successfully');
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      {message && <p>{message}</p>}
      <ProfileForm
        profileData={profileData}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default ProfileUpdate;
