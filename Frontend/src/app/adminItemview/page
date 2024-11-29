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
import { GET_Item } from "@/Constants/EndPoints";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

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

const Dashboard = () => {
  const router = useRouter();
  const [items, setItems] = useState([]);

  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [itemId, setItemId] = useState<number>(null);
  const [fetCount, setFetCount] = useState<number>(1);

  const user = getProfileData() as User | undefined;
  console.log("user", user);
  const id = user?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [getGym] = await Promise.all([
          fetch(process.env.NEXT_PUBLIC_API_URL + "/item/getAll/" + id),
        ]);
        const FetchGyms = await getGym.json();
        setItems(FetchGyms.items);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [fetCount]);
  const handleDeleteClick = async (itemId: number) => {
    console.log("itemId", itemId);
    setItemId(itemId);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    try {
      console.log("itemId in delete", itemId);
      const response = await fetch(`${GET_Item}/${itemId}`, {
        method: "DELETE",
      });
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
      <div className="min-h-screen bg-primary-foreground p-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-secondary-foreground">
            Admin Items
          </h1>
          {/* <h2 className="text-2xl mt-2 text-secondary-foreground">Overview</h2> */}
        </header>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "30px",
            justifyContent: "center", // Center the items if needed
          }}
        >
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item._id}
                className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2"
                style={{
                  width: "300px", // Fixed width for each card
                  height: "400px", // Fixed height for each card
                }}
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="object-cover w-full h-2/3" // 2/3 height for the image section
                />
                <div className="p-4 bg-background h-1/3">
                  {" "}
                  {/* 1/3 height for the content section */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.address.street}, {item.address.city}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => handleDeleteClick(item._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outline"
                      >
                        <Link href={`/items/${item._id}`}>Edit</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="justify-center align-center flex-wrap font-extrabold text-3xl">
              <p className="font-extrabold text-3xl">No Items found</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
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
    </ProtectedRoute>
  );
};

export default Dashboard;
