import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from './MainLayout/Root';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Signup from './Components/SignUp/Signup';
import AuthProvider from './AuthProvider/AuthProvider';
import BookService from './Components/BookService/BookService';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <Signup></Signup>
      }, 
      {
        path: 'bookservice/:id',
        element: <BookService></BookService>,
        loader: ({ params }) => fetch(`http://localhost:5000/services/${params.id}`)
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
