import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  // Modes pour nav items
  const [logedIn, setLogedin] = useState(false);
  const [isAdmin, setIsadmin] = useState(false);

  return (
    <div>
      <Header logedIn={logedIn} isAdmin={isAdmin}/>
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
