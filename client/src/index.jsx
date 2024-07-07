import React from 'react'
import ReactDOM from 'react-dom/client'

// Pages
import App from './App.jsx'
import NotFound from './pages/NotFound.jsx';
import Apropos from './pages/Apropos.jsx';
import Connexion from './pages/Connexion.jsx';
import MesFavoris from './pages/MesFavoris.jsx';
import GererMesEspaces from './pages/GererMesEspaces.jsx';
import Home from './pages/Home.jsx';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// style
import './index.css'

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  errorElement: <NotFound />,
  children:[
    {index: true, path: '/', element: <Home/>},
    {path: '/Àpropos', element: <Apropos />},
    {path: '/Connexion', element: <Connexion />},
    {path: '/MesFavoris', element: <MesFavoris />},
    {path: '/Gérermesespaces', element: <GererMesEspaces />},
  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
