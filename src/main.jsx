import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from './MainLayout/Root';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
