import React, { useState } from 'react';
import axios from 'axios';

const DonationForm = () => {
  const [itemName, setItemName] = useState('');
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('location[lat]', location.lat);
    formData.append('location[lng]', location.lng);
    formData.append('image', image);  // Attach the image to the form data

    try {
      const response = await axios.post('/api/donations/donate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Donation created successfully:', response.data);
    } catch (error) {
      console.error('Error creating donation:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Item Name:</label>
        <input 
          type="text" 
          value={itemName} 
          onChange={(e) => setItemName(e.target.value)} 
        />
      </div>
      <div>
        <label>Latitude:</label>
        <input 
          type="number" 
          value={location.lat} 
          onChange={(e) => setLocation({ ...location, lat: e.target.value })} 
        />
      </div>
      <div>
        <label>Longitude:</label>
        <input 
          type="number" 
          value={location.lng} 
          onChange={(e) => setLocation({ ...location, lng: e.target.value })} 
        />
      </div>
      <div>
        <label>Upload Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <button type="submit">Create Donation</button>
    </form>
  );
};

export default DonationForm;