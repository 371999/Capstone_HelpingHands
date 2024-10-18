import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PickupScheduler = () => {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [pickupType, setPickupType] = useState('delivery');  // delivery or pickup
  const [trackingId, setTrackingId] = useState('');  // For third-party delivery tracking

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get('/api/donations/available');
        setDonations(res.data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations();
  }, []);

  const handleSchedule = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/pickups/schedule', {
        donationId: selectedDonation,
        type: pickupType,
        scheduleDate,
        trackingId: pickupType === 'delivery' ? trackingId : null,  // Only add tracking ID for deliveries
      });
      alert('Pickup scheduled successfully');
      console.log(res.data);
    } catch (error) {
      console.error('Error scheduling pickup:', error);
    }
  };

  return (
    <div>
      <h2>Schedule a Pickup</h2>
      <form onSubmit={handleSchedule}>
        <div>
          <label>Donation:</label>
          <select 
            value={selectedDonation} 
            onChange={(e) => setSelectedDonation(e.target.value)} 
            required
          >
            <option value="">Select a donation</option>
            {donations.map(donation => (
              <option key={donation._id} value={donation._id}>
                {donation.itemName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Pickup Type:</label>
          <select 
            value={pickupType} 
            onChange={(e) => setPickupType(e.target.value)} 
            required
          >
            <option value="delivery">Delivery</option>
            <option value="pickup">Pickup</option>
          </select>
        </div>
        {pickupType === 'delivery' && (
          <div>
            <label>Tracking ID (if available):</label>
            <input 
              type="text" 
              value={trackingId} 
              onChange={(e) => setTrackingId(e.target.value)} 
              placeholder="Enter tracking ID"
            />
          </div>
        )}
        <div>
          <label>Schedule Date:</label>
          <input 
            type="date" 
            value={scheduleDate} 
            onChange={(e) => setScheduleDate(e.target.value)} 
            required
          />
        </div>
        <button type="submit">Schedule Pickup</button>
      </form>
    </div>
  );
};

export default PickupScheduler;