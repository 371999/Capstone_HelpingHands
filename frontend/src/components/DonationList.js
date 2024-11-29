import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';  // For real-time updates
import geolib from 'geolib';  // For calculating distances

const DonationList = () => {
  const [donations, setDonations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Fetch donations with pagination
    const fetchDonations = async () => {
      const res = await axios.get(`/api/donations/available?page=${currentPage}`);
      setDonations(res.data.donations);
      setTotalPages(res.data.totalPages);
    };

    fetchDonations();

    // Get the user's current location for proximity-based notifications
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      });
    }

    // Set up real-time updates with Socket.io
    const socket = io('http://localhost:5000');  // Replace with your server's URL

    // Listen for new donations
    socket.on('newDonation', (newDonation) => {
      if (userLocation) {
        const distance = geolib.getDistance(userLocation, {
          latitude: newDonation.location.lat,
          longitude: newDonation.location.lng,
        });

        // Notify the user if the donation is within 10 km
        if (distance <= 10000) {
          alert(`New donation nearby: ${newDonation.itemName}`);
        }
      }
    });

    // Listen for updates when donations are claimed
    socket.on('donationUpdated', (updatedDonation) => {
      setDonations((prevDonations) =>
        prevDonations.filter((donation) => donation._id !== updatedDonation.donationId)
      );
    });

    return () => {
      socket.disconnect();  // Clean up the socket connection
    };
  }, [currentPage, userLocation]);

  return (
    <div>
      <h2>Available Donations</h2>
      <ul>
        {donations.map((donation) => (
          <li key={donation._id}>
            <p>{donation.itemName}</p>
            {donation.imageUrl && (
              <img 
                src={donation.imageUrl} 
                alt={donation.itemName} 
                style={{ width: '200px' }} 
              />
            )}
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div>
        {Array.from({ length: totalPages }, (_, i) => (
          <button 
            key={i} 
            disabled={i + 1 === currentPage} 
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DonationList;