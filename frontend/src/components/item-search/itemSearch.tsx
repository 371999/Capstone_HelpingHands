"use client"

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import axios from 'axios';
import { StarIcon } from 'lucide-react';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { getProfileData } from "../../../Auth/AuthService";

type sortOptionType = "Our top picks" | "Price (lowest first)" | "Best reviewed" | "Property rating (high to low)"

const SearchItems = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState('All');
  const [response, setResponse] = useState('');
  const [showMyRequests, setShowMyRequests] = useState(false);

  const user = getProfileData();

  const fetchGyms = async () => {
    console.log("fetch gyms");

    setLoading(true);
    // const payload = {
    //   type: searchTerm === 'All' ? null : searchTerm,
    // };
    const type = sortOption === 'All' ? '' : `&type=${sortOption}`;
    const userQuery = showMyRequests && user ? `?userId=${user.id}` : '?status=1';
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/item${userQuery}${type}`);
      console.log("response", response);
      setItems(response.data.items);
    } catch (error) {
      console.error('Error fetching gyms:', error);
    } finally {
      setLoading(false);
    }

    try {
      const newResponse = await axios.get("https://csci-5709-tutorials-btrp.onrender.com/test");
      if(newResponse) {
        setResponse(newResponse.data?.message);
      }
    } catch (error) {
      console.error('Error fetching gyms:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleSelect = (eventKey) => {
    console.log("handle select", eventKey);
    setSortOption(eventKey);
    // fetchGyms(); // Fetch gyms immediately when sort option changes
  };

  const handleToggle = () => {
    setShowMyRequests(prev => !prev);  // Toggle showMyRequests
  };

  useEffect(() => {
    fetchGyms();
  }, [sortOption, showMyRequests]); // Fetch gyms when these dependencies change

  return (

    <div style={{ marginTop: '30px' }}>
      <h1>{response}</h1>

      <div className="flex flex-col gap-4 p-4 mx-4">
        <div className="flex flex-row gap-4 items-center">
          {/* <input
            type="text"
            placeholder="Search item by title..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={e => setCity(e.target.value)}
          /> */}
          <div className="flex items-center gap-2">
            <span>Filter by:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default">{sortOption}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Item Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => handleSelect("All")}>All</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleSelect("Food")}>Food</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleSelect("Clothes")}>Clothes</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="toggle">My Requests Only</label>
            <input
              id="toggle"
              type="checkbox"
              checked={showMyRequests}
              onChange={handleToggle}
              className="toggle-checkbox"
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>

        {items.length > 0 ? items.map(item => (
          <div
            key={item._id}
            className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2"
          >
            <Link href={`/itemDetails/${item._id}`} className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View</span>
            </Link>
            <img src={item.images[0]} alt={item.name} width={400} height={300} className="object-cover w-full h-64" />
            <div className="p-4 bg-background">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{item.title}</h3>
                {/* <div className="flex items-center gap-1 text-sm font-medium text-primary">
                  <StarIcon className="w-4 h-4 fill-primary" />
                  {item.ratings?.count > 0 ? (item.ratings.totalRatings / item.ratings.count).toFixed(1) : 0}
                </div> */}
              </div>
              <p className="text-sm text-muted-foreground">{item.address.street}, {item.address.city}</p>
              {/* <div className="flex items-center justify-between mt-2">
                <Button variant="outline" size="sm">
                  Check Now
                </Button>
              </div> */}
            </div>
          </div>
        )) : <p>No items found</p>}
      </div>
    </div>

  );
};

export default SearchItems;