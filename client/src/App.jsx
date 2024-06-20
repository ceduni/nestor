import { useState } from 'react'
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
      <Footer />
    </div>
  )
}

export default App
