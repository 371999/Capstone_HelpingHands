"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Line } from "react-chartjs-2";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProtectedRoute from "../../../Auth/ProtectedRoutes";
import { getProfileData } from "../../../Auth/AuthService";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GET_Item, PROFILE_URL } from "@/Constants/EndPoints";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import httpFetch from "@/lib/httpFetch";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface User {
  _id: string;
  id: any;
  gymName: any;
  firstName: string;
  lastName: string;
  email: string;
}

export default function Component() {
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [pastBookings, setPastBookings] = useState<any[]>([]);
  const router = useRouter();
  const user = getProfileData();
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [fetCount, setFetCount] = useState<number>(1);

  useEffect(() => {
    console.log("userData", user);

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/profile/getAll/${user.id}`
        );
        const data = await response.json();
        console.log("response", data);

        // const now = new Date();
        // const current = data.items.filter((booking: Booking) => new Date(booking.endDate) > now);
        // const past = data.items.filter((booking: Booking) => new Date(booking.endDate) <= now);

        setAllUsers(data.profiles);
        // setPastBookings(past);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchUsers();
  }, [fetCount]);


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };


  const giveReviewToast = (variant: string, description: string) => {
    toast({
      variant: variant,
      title: "Review status",
      description: description,
    });
  };

  // const handleRate = (booking:any) => {
  //   setSelectedUser(booking);
  //   setIsDialogOpen(true);
  // };

  const handleDeleteClick = async (user: any) => {
    console.log("itemId", user);
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    try {
      console.log("itemId in delete", selectedUser);
      const response = await fetch(`${PROFILE_URL}/${selectedUser._id}`, {
        method: "DELETE",
      });
      console.log("response", response);
      if (response.ok) {
        toast.success("Item deleted successfully.");
        setShowDeleteDialog(false);
        setFetCount(fetCount+1);
        // setTimeout(() => {
        //   router.push("/adminItem");
        // }, 2000);
      } else {
        toast.error("Error deleting item.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error deleting item.");
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-6 py-8 sm:px-8 lg:px-10">
        <h1 className="text-2xl font-bold mb-6">Users</h1>
        <div className="grid gap-8">
          <div>
            <div className="grid gap-6">
              {allUsers &&
                allUsers.map(
                  (user, index) =>
                    (
                      <Card
                        key={index}
                        className="flex items-center justify-between gap-4 px-4 py-4"
                      >
                        {/* <img
                          src={user.item.images[0]}
                          className="w-24 h-24 object-cover"
                        /> */}

                        <div className="flex-1 grid gap-1">
                          <h4 className="text-lg font-semibold">
                            {user.firstName} {user.lastName}
                          </h4>
                        </div>

                        <div className="flex-1">
                          <span className="font-semibold">
                            {user.email}
                          </span>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          // onClick={() =>
                          //   handleUpdate(booking._id, booking.gym._id)
                          // }
                          onClick={() => handleDeleteClick(user)}
                        >
                          Delete
                        </Button>
                      </Card>
                    )
                )}
            </div>
          </div>
        </div>
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <p>Are you sure you want to delete user: {selectedUser?.firstName}?</p>
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
      </div>
    </ProtectedRoute>
  );
}
