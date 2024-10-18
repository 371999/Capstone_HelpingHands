import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import axios from 'axios';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100%;
  height: 500px;
`;

const GoogleMapComponent = () => {
  const [donations, setDonations] = useState([]);
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const res = await axios.get('/api/donations/available');
      setDonations(res.data);
    };

    const fetchPickups = async () => {
      const res = await axios.get('/api/pickups');
      setPickups(res.data);
    };

    fetchDonations();
    fetchPickups();
  }, []);

  const mapContainerStyle = {
    width: '100%',
    height: '500px',
  };

  const defaultCenter = {
    lat: 40.73061,
    lng: -73.935242,
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <MapContainer>
        <GoogleMap mapContainerStyle={mapContainerStyle} center={defaultCenter} zoom={10}>
          {donations.map(donation => (
            <Marker 
              key={donation._id} 
              position={{ lat: donation.location.lat, lng: donation.location.lng }} 
              title={donation.itemName} 
            />
          ))}
          {pickups.map(pickup => (
            <Marker 
              key={pickup._id} 
              position={{ lat: pickup.donation.location.lat, lng: pickup.donation.location.lng }} 
              title={`Pickup: ${pickup.type}`} 
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
              }} 
            />
          ))}
        </GoogleMap>
      </MapContainer>
    </LoadScript>
  );
};

export default GoogleMapComponent;