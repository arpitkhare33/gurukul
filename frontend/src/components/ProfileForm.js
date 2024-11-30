// components/ProfileForm.js

import React from 'react';

const ProfileForm = ({ profileData, handleInputChange, handleFileChange, handleSubmit, loading }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={profileData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Bio:
        <textarea
          name="bio"
          value={profileData.bio}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Phone:
        <input
          type="text"
          name="phone"
          value={profileData.phone}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Contact Details:
        <input
          type="text"
          name="contactDetails"
          value={profileData.contactDetails}
          onChange={handleInputChange}
        />
      </label>
      {/* <label>
        Profile Picture:
        <input type="file" name="profilePicture" onChange={handleFileChange} />
      </label> */}
      <button type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
};

export default ProfileForm;
