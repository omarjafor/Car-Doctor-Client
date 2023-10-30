import axios from "axios";
import { useEffect } from "react";
import useHook from "./useHook";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000/',
    withCredentials: true
})

const useAxios = () => {
    const { logOut } = useHook();
    const navigate = useNavigate()

    useEffect( () => {
        axiosSecure.interceptors.response.use( res => {
            return res;
        }, error => {
            console.log('Error Tracking', error);
            if(error.response.status === 401 || error.response.status === 403){
                console.log('Logout the user');
                logOut()
                .then(() => {
                    navigate('/login')
                })
                .catch(err => console.log(err.message))
            }
        })

    } , [logOut, navigate])

    return axiosSecure;
};

export default useAxios;