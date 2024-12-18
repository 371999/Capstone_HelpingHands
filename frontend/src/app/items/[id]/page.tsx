"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "../../../../Auth/ProtectedRoutes";
import { GET_Item } from "../../../Constants/EndPoints";
import { useRouter, useParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProfileData } from "../../../../Auth/AuthService";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface LoggedInUser {
  firstName?: string;
  lastName?: string;
  gymName?: string;
  type?: string;
  email?: string;
  id?: string;
}



const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.7749, // Default latitude
  lng: -122.4194, // Default longitude
};

export default function EditGymPage() {
  const router = useRouter();
  const { id: gymId } = useParams();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // const [tagline, setTagline] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>();
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<string[]>([]);
  const [recordUserId, setRecordUserId] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const [errors, setErrors] = useState({
    description: false,
    title: false,
    street: false,
    city: false,
    province: false,
    country: false,
  });
  const [position, setPosition] = useState<{ lat: number; lng: number }>(center);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const GOOGLE_MAPS_API_KEY = "AIzaSyCgh7PYa4V4rBylomneCDCmsvlp6SqwkK0";
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const userProfile = await getProfileData();
        if (userProfile) {
          // @ts-ignore
          setLoggedInUser(userProfile);
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
      }
    };

    const loadGymData = async () => {
      try {
        const response = await fetch(`${GET_Item}/${gymId}`);

        if (response.ok) {
          const gymData = await response.json();
          console.log(gymData);
          setTitle(gymData.item.title);
          setDescription(gymData.item.description);
          // setTagline(gymData.item.tagline);
          setStreet(gymData.item.address.street);
          setCity(gymData.item.address.city);
          setProvince(gymData.item.address.province);
          setCountry(gymData.item.address.country);
          // setAmenities(gymData.item.amenities || []);
          // setWeekdayHours(gymData.item.hours[0]);
          // setWeekendHours(gymData.item.hours[1]);
          setPrice(gymData.item.price);
          setExistingImages(gymData.item.images || []);
          setRecordUserId(gymData.item.userId);
        } else {
          toast.error("Error loading gym data.");
        }
      } catch (error) {
        console.error("Error loading gym data:", error);
      }
    };

    loadProfileData();
    loadGymData();
  }, [gymId]);

  useEffect(() => {
    if (loggedInUser && recordUserId) {
      setIsEditable(loggedInUser.id === recordUserId || loggedInUser.type === "admin");
    }
  }, [loggedInUser, recordUserId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const promises = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    });

    Promise.all(promises)
      .then((base64Files) => {
        setNewImages([...newImages, ...base64Files]);
      })
      .catch((error) =>
        console.error("Error converting files to base64:", error)
      );
  };

  const handleImageRemove = (index: number, isNew: boolean) => {
    if (isNew) {
      const updatedNewImages = [...newImages];
      updatedNewImages.splice(index, 1);
      setNewImages(updatedNewImages);
    } else {
      const updatedExistingImages = [...existingImages];
      updatedExistingImages.splice(index, 1);
      setExistingImages(updatedExistingImages);
    }
  };

  const validateForm = () => {
    const newErrors = {
      description: !description,
      title: !title,
      street: !street,
      city: !city,
      province: !province,
      country: !country,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("inside handle")
    e.preventDefault();


    if (!validateForm()) {
      return;
    }

    const formData = {
      title,
      location: {
        street,
        city,
        province,
        country,
      },
      description,
      // price: Number(price),
      userId: loggedInUser?.id,
      images: [...existingImages, ...newImages],
    };

    try {
      const response = await fetch(`${GET_Item}/${gymId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Item updated successfully.");

        setTimeout(() => {
          // @ts-ignore
          if(loggedInUser.type === "admin") {
            router.push("/adminItemView");
          }
          else {
            router.push("/itemDashboard");
          }
        }, 2000);
      } else {
        toast.error("Error updating gym profile.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${GET_Item}/${gymId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Item deleted successfully.");
        setTimeout(() => {
          router.push("/itemDashboard");
        }, 2000);
      } else {
        toast.error("Error deleting item.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error deleting item.");
    }
  };

  const onMapClick = async (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setPosition({ lat, lng });

      // Fetch address details
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results[0]) {
        const addressComponents = data.results[0].address_components;

        const getAddressComponent = (type: string) => {
          const component = addressComponents.find((comp: any) =>
            comp.types.includes(type)
          );
          return component ? component.long_name : "";
        };

        setStreet(getAddressComponent("route"));
        setCity(getAddressComponent("locality"));
        setProvince(getAddressComponent("administrative_area_level_1"));
        setCountry(getAddressComponent("country"));
      }
    }
  };

  const onAutocompleteLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setPosition({ lat, lng });

        const addressComponents = place.address_components;

        const getAddressComponent = (type: string) => {
          const component = addressComponents?.find((comp: any) =>
            comp.types.includes(type)
          );
          return component ? component.long_name : "";
        };

        setStreet(getAddressComponent("route"));
        setCity(getAddressComponent("locality"));
        setProvince(getAddressComponent("administrative_area_level_1"));
        setCountry(getAddressComponent("country"));
      }
    });
  };

  return (
    <ProtectedRoute>
      <div className="w-full max-w-3xl mx-auto m-5">
        <Card className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Edit Item</CardTitle>
            <CardDescription>
              Update your item details for the existing listing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name">Item Title</Label>
                <Input
                  id="title"
                  value={title}
                  disabled={!isEditable}
                  onChange={(e) => setTitle(e.target.value)}
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-red-500">Item title is required.</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={description}
                  disabled={!isEditable}
                  onChange={(e) => setDescription(e.target.value)}
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-red-500">Description is required.</p>
                )}
              </div>

              {/* <div>
                                <Label htmlFor="tagline">Tagline</Label>
                                <Input id="tagline" value={tagline} disabled={!isEditable} onChange={(e) => setTagline(e.target.value)} />
                            </div> */}

              <div>
                <Label htmlFor="street">Street</Label>
                <Input
                  id="street"
                  value={street}
                  disabled={!isEditable}
                  onChange={(e) => setStreet(e.target.value)}
                  className={errors.street ? "border-red-500" : ""}
                />
                {errors.street && (
                  <p className="text-red-500">Street is required.</p>
                )}
              </div>

              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={city}
                  disabled={!isEditable}
                  onChange={(e) => setCity(e.target.value)}
                  className={errors.city ? "border-red-500" : ""}
                />
                {errors.city && (
                  <p className="text-red-500">City is required.</p>
                )}
              </div>

              <div>
                <Label htmlFor="province">Province</Label>
                <Input
                  id="province"
                  value={province}
                  disabled={!isEditable}
                  onChange={(e) => setProvince(e.target.value)}
                  className={errors.country ? "border-red-500" : ""}
                />
                {errors.province && (
                  <p className="text-red-500">Province is required.</p>
                )}
              </div>

              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={country}
                  disabled={!isEditable}
                  onChange={(e) => setCountry(e.target.value)}
                  className={errors.country ? "border-red-500" : ""}
                />
                {errors.country && (
                  <p className="text-red-500">Country is required.</p>
                )}
              </div>
              {/* Google Map */}
          <div className="mt-4">
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={position}
                zoom={15}
                onClick={onMapClick}
                onLoad={() => setMapLoaded(true)}
              >
                <Marker position={position} />
              </GoogleMap>
              {mapLoaded && (
                <Autocomplete onLoad={onAutocompleteLoad}>
                  <Input placeholder="Search location..." className="mt-2" />
                </Autocomplete>
              )}
            </LoadScript>
          </div>

              {/* <div>
                                <Label htmlFor="price">Price</Label>
                                <Input id="price" type="number"  disabled={!isEditable} value={price || ''} onChange={(e) => setPrice(parseFloat(e.target.value))} className={errors.price ? 'border-red-500' : ''} />
                                {errors.price && <p className="text-red-500">Price must be a positive number.</p>}
                            </div> */}

              {/* <div>
                                <Label>Amenities</Label>
                                {amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center  mb-2">
                                        <Input value={amenity}  disabled={!isEditable} onChange={(e) => updateAmenity(index, e.target.value) }
                                               className="mr-2"/>
                                        {isEditable && (<Button type="button" onClick={() => removeAmenity(index)}
                                                                className="bg-red-500 text-white">Remove</Button>)}
                                    </div>
                                ))}
                                {isEditable && (<Button type="button" onClick={addAmenity} className="mt-2">Add Amenity</Button>)}
                            </div> */}

              {/* <div>
                                <Label htmlFor="weekdayHours">Weekday Hours</Label>
                                <Input id="weekdayHours" value={weekdayHours} disabled={!isEditable}
                                       onChange={(e) => setWeekdayHours(e.target.value)}/>
                            </div>

                            <div>
                                <Label htmlFor="weekendHours">Weekend Hours</Label>
                                <Input id="weekendHours" value={weekendHours} disabled={!isEditable}
                                       onChange={(e) => setWeekendHours(e.target.value)}/>
                            </div> */}

              <div>
                <Label htmlFor="images">Images</Label>
                {isEditable && (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                )}
                <div className="mt-4">
                  {existingImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative inline-block mr-2 mb-2"
                    >
                      <img
                        src={`${image}`}
                        alt={`Image ${index}`}
                        className="w-24 h-24 object-cover"
                      />
                      {isEditable && (
                        <Button
                          type="button"
                          onClick={() => handleImageRemove(index, false)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                        >
                          X
                        </Button>
                      )}
                    </div>
                  ))}
                  {newImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative inline-block mr-2 mb-2"
                    >
                      <img
                        src={image}
                        alt={`New Image ${index}`}
                        className="w-24 h-24 object-cover"
                      />
                      {isEditable && (
                        <Button
                          type="button"
                          onClick={() => handleImageRemove(index, true)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                        >
                          X
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {isEditable && <Button type="submit">Update Item</Button>}
            </form>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </CardFooter>
          {/* <CardFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(true)}>
              Delete
            </Button>
          </CardFooter> */}
        </Card>
        <ToastContainer />

        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogTrigger asChild>
            <Button size="lg" variant="destructive" className="w-full">
              Delete Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <p>Are you sure you want to delete this item?</p>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
                className="w-full"
              >
                No
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="w-full"
              >
                Yes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="p-6 rounded shadow-lg">
                            <h3 className="text-lg font-bold">Confirm Delete</h3>
                            <p>Are you sure you want to delete this item?</p>
                            <div className="flex justify-end space-x-4 mt-4">
                                <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        setShowDeleteDialog(false);
                                        handleDelete();
                                    }}
                                >
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    </div>
                </Dialog> */}
      </div>
    </ProtectedRoute>
  );
}
