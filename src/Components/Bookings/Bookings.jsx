import { useEffect, useState } from "react";
import useHook from "../../useHook/useHook";


const Bookings = () => {
    const [bookings, setBookings] = useState([]);

    const { user } = useHook();
    const url = `http://localhost:5000/bookings?email=${user.email}`;

    useEffect( () => {
        fetch(url)
        .then(res => res.json())
        .then(data => setBookings(data))
    } , [url])
    
    return (
        <div>
            
        </div>
    );
};

export default Bookings;