import React from 'react';
import ReactDOM from 'react-dom/client';
import FrontPage from './components/FrontPage.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './css/index.css';
import Client from './components/Client.jsx';
import Attorney from './components/Attorney.jsx';

// This file is our main router page, where we can add new pages to our app!

const router = createBrowserRouter([
  //so in website if you go to / you go to frontpage, if you go to /hello, you see hello
  {
    path: '/',
    element: <FrontPage />,
  },

  //test page
  {
    path: '/attorney',
    element: <Attorney />,
  },

  {
    path: '/client',
    element: <Client />,
  },
]);

// DONT TOUCH BELOW!

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
