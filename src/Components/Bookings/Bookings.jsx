import { useEffect, useState } from "react";
import useHook from "../../useHook/useHook";
import BookingRow from "../BookService/BookingRow";


const Bookings = () => {
    const [bookings, setBookings] = useState([]);

    const { user } = useHook();
    const url = `http://localhost:5000/bookings?email=${user.email}`;

    useEffect( () => {
        fetch(url)
        .then(res => res.json())
        .then(data => setBookings(data))
    } , [url])
    
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