import { useEffect, useState } from "react";
import useHook from "../../useHook/useHook";
import BookingRow from "../BookService/BookingRow";
// import axios from 'axios';
import useAxios from "../../useHook/useAxios";

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const axiosSecure = useAxios();

    const { user } = useHook();
    // const url = `http://localhost:5000/bookings?email=${user.email}`;
    const url = `/bookings?email=${user.email}`;

    useEffect( () => {
        axiosSecure.get(url)
        .then(res => setBookings(res.data))

        // axios.get(url, { withCredentials: true })
        // .then(res => {
        //     setBookings(res.data);
        // })

        // fetch(url)
        // .then(res => res.json())
        // .then(data => setBookings(data))
    } , [axiosSecure, url])
    
    const handleDelete = (id) => {
        const proced = confirm('Are You Sure & Want To Delete?');
        if(proced){
            fetch(`http://localhost:5000/bookings/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                if(data.deletedCount > 0 ){
                    alert('Deleted Successful');
                    const remaining = bookings.filter( book => book._id !== id );
                    setBookings(remaining);
                }
            })
        }
    }

    const handleBookingConfirm = (id) => {
        fetch(`http://localhost:5000/bookings/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    const remaining = bookings.filter(booking => booking._id !== id)
                    const updated = bookings.filter(booking => booking._id == id)
                    updated.status = 'confirm'
                    const newbooking = [updated, ...remaining]
                    setBookings(newbooking);
                }
            })
    }

    return (
        <div>
            <h2 className="text-5xl">Your bookings: {bookings.length}</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingRow
                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                                handleBookingConfirm={handleBookingConfirm}
                            ></BookingRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;