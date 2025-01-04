import { useEffect, useState } from "react";
import Button from "./Button";
import toast from "react-hot-toast";
import axios from "axios";

export interface BookingsProps {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  noOfGuests: string;
  dateTime: string;
}

const ListBookings = ({ bookings }: { bookings: BookingsProps[] }) => {
  const [booking, setBooking] = useState<BookingsProps[]>([]);

  useEffect(() => {
    setBooking(bookings);
  }, [bookings]);

  const clickHandler = async (id: number) => {
    const URL = process.env.NEXT_PUBLIC_BE_URL;
    try {
      setBooking(booking.filter((element) => element.id !== id));
      const response: { data: { success: boolean; message: string } } =
        await axios.delete(`${URL}/api/v1/deleteBooking/${id}`);

      toast.success(response.data.message);
    } catch (err: any) {
      toast.error(err.reponse.data.message);
    }
  };

  return (
    <div className="px-4">
      {booking.length > 0 ? (
        <div>
          <div className="hidden md:grid grid-cols-6 font-bold text-gray-700">
            <p>Name</p>
            <p>Email</p>
            <p>Phone</p>
            <p>Guests</p>
            <p>Date & Time</p>
            <p>Action</p>
          </div>

          <div className="flex flex-col gap-4">
            {booking.map((element, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-6 gap-4 border-t-2 pt-2 mt-2"
              >
                <p>
                  <span className="md:hidden font-bold">Name: </span>
                  {element.name}
                </p>
                <p>
                  <span className="md:hidden font-bold">Email: </span>
                  {element.email}
                </p>
                <p>
                  <span className="md:hidden font-bold">Phone: </span>
                  {element.phoneNumber}
                </p>
                <p className="">
                  <span className="md:hidden font-bold">Guests: </span>
                  {element.noOfGuests}
                </p>
                <p className="">
                  <span className="md:hidden font-bold">Date & Time: </span>
                  {element.dateTime}
                </p>
                <p>
                  <span className="md:hidden font-bold">Action </span>
                  <Button
                    className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-300 transition-all duration-200"
                    onClick={() => clickHandler(element.id)}
                  >
                    Delete
                  </Button>
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center pt-24 font-bold text-xl">
          No Bookings Yet
        </div>
      )}
    </div>
  );
};

export default ListBookings;
