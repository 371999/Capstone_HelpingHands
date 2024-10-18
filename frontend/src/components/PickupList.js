import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PickupList = () => {
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const res = await axios.get('/api/pickups');
        setPickups(res.data);
      } catch (error) {
        console.error('Error fetching pickups:', error);
      }
    };

    fetchPickups();
  }, []);

  const handleComplete = async (id) => {
    try {
      const res = await axios.patch(`/api/pickups/complete/${id}`);
      alert('Pickup marked as completed');
      setPickups(pickups.map(pickup => pickup._id === id ? { ...pickup, completed: true } : pickup));
    } catch (error) {
      console.error('Error marking pickup as completed:', error);
    }
  };

  return (
    <div>
      <h2>Scheduled Pickups</h2>
      <ul>
        {pickups.map(pickup => (
          <li key={pickup._id}>
            {pickup.donation.itemName} - {pickup.type} - {pickup.scheduleDate} - 
            {pickup.completed ? "Completed" : <button onClick={() => handleComplete(pickup._id)}>Mark as Completed</button>}
            {pickup.trackingId && <p>Tracking ID: {pickup.trackingId}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PickupList;