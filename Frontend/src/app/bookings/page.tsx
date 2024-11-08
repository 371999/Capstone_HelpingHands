"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../../Auth/ProtectedRoutes";
import { getProfileData } from "../../../Auth/AuthService";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StarIcon } from "lucide-react";
import httpFetch from "@/lib/httpFetch";
import { CREATE_REQUEST, GET_REVIEWS } from "@/Constants/EndPoints";
import { toast } from "@/components/ui/use-toast";

interface Booking {
  startDate: string;
  endDate: string;
  charges: number | string;
  _id: string;
  gymId: string;
  gym: any;
}

export default function Component() {
  const [currentBookings, setCurrentBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  const router = useRouter();
  const user = getProfileData();
  const [feedback, setFeedback] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  useEffect(() => {
    console.log("userData", user);

    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/request/${user.id}`
        );
        const data = await response.json();
        console.log("response", data);

        // const now = new Date();
        // const current = data.items.filter((booking: Booking) => new Date(booking.endDate) > now);
        // const past = data.items.filter((booking: Booking) => new Date(booking.endDate) <= now);

        setCurrentBookings(data);
        // setPastBookings(past);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleFeedbackSubmit = async () => {
    if (!selectedBooking) return;

    try {
      const response = await httpFetch(
        CREATE_REQUEST + `/${selectedBooking._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comments: feedback,
          }),
        }
      );

      if (response.ok) {
        setIsDialogOpen(false);
        setFeedback("");
        giveReviewToast("success", "The review submitted successfully!");
      } else {
        giveReviewToast("destructive", "Failed to submit review!");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      giveReviewToast("destructive", "Failed to submit review!");
    }
  };

  const giveReviewToast = (variant: string, description: string) => {
    toast({
      variant: variant,
      title: "Review status",
      description: description,
    });
  };

  const handleRate = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDialogOpen(true);
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-6 py-8 sm:px-8 lg:px-10">
        <h1 className="text-2xl font-bold mb-6">Request History</h1>
        <div className="grid gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Current Request</h2>
            <div className="grid gap-6">
              {currentBookings &&
                currentBookings.map(
                  (booking, index) =>
                    booking.item &&
                    booking.item.status === 1 &&
                    booking.status === 0 && (
                      <Card
                        key={index}
                        className="flex items-center justify-between gap-4 px-4 py-4"
                      >
                        <img
                          src={booking.item.images[0]}
                          className="w-24 h-24 object-cover"
                        />

                        <div className="flex-1 grid gap-1">
                          <h4 className="text-lg font-semibold">
                            {booking.item.title}
                          </h4>
                        </div>

                        <div className="flex-1">
                          <span className="font-semibold">
                            {booking.userName}
                          </span>
                          <p className="text-sm italic text-muted-foreground">
                            {booking.requestType}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {booking.message}
                          </p>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          // onClick={() =>
                          //   handleUpdate(booking._id, booking.gym._id)
                          // }
                          onClick={() => handleRate(booking)}
                        >
                          Accept
                        </Button>
                      </Card>
                    )
                )}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Accepted Request</h2>
            <div className="grid gap-6">
              {currentBookings &&
                currentBookings.map(
                  (booking, index) =>
                    booking.item &&
                    booking.status === 1 && (
                      <Card
                        key={index}
                        className="flex items-center justify-between gap-4 px-4 py-4"
                      >
                        <img
                          src={booking.item.images[0]}
                          className="w-24 h-24 object-cover"
                        />

                        <div className="flex-1 grid gap-1">
                          <h4 className="text-lg font-semibold">
                            {booking.item.title}
                          </h4>
                        </div>

                        <div className="flex-1">
                          <span className="font-semibold">
                            {booking.userName}
                          </span>
                          <p className="text-sm italic text-muted-foreground">
                            {booking.requestType}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {booking.message}
                          </p>
                        </div>

                        <Button variant="outline" size="sm" disabled>
                          Accepted
                        </Button>
                      </Card>
                    )
                )}
            </div>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <h2 className="text-xl font-bold mb-4">Write Comment</h2>
            <div className="space-y-4">
              <Input
                id="comment"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <Button onClick={handleFeedbackSubmit}>Accept Request</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}
