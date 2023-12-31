import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import axios from "axios";


export const AuthContext = createContext();

const AuthProvider = ( { children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true)
        axios.post('http://localhost:5000/logout', user?.email, { withCredentials: true })
        .then(res => {
            console.log(res.data);
        })
        return signOut(auth);
    }

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            console.log('Current User :', currentUser)
            if(currentUser){
                const loggedUser = { email: currentUser.email}
                axios.post('http://localhost:5000/jwt', loggedUser, { withCredentials: true })
                .then(res => {
                    console.log( 'Token Response:', res.data);
                })
            }
        });
        
        return () => {
            unsubscribe();
        }
    } , [])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;