import { useState } from 'react'
import nestorLogo from './assets/logo-nestor.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'

function App() {
  // Modes pour nav items
  const [logedIn, setLogedin] = useState(false);
  const [isAdmin, setIsadmin] = useState(false);

  return (
    <div>
      <Header logedIn={logedIn} isAdmin={isAdmin}/>
    </div>
  )
}

export default App
