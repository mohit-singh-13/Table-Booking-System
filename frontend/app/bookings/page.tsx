"use client";

import ListBookings, { BookingsProps } from "@/components/ListBookings";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Home = () => {
  const [bookings, setBookings] = useState<BookingsProps[]>([]);

  const fetchBookings = async () => {
    const URL = process.env.NEXT_PUBLIC_BE_URL;
    try {
      const {
        data,
      }: { data: { success: boolean; bookings: BookingsProps[] } } =
        await axios.get(`${URL}/api/v1/bookings`);

      if (data === undefined) return;
      setBookings(data.bookings);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="px-8 py-8">
      <ListBookings bookings={bookings} />
    </div>
  );
};

export default Home;
