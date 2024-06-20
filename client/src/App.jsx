import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

function App() {
  // Modes pour nav items
  const [logedIn, setLogedin] = useState(false);
  const [isAdmin, setIsadmin] = useState(false);

  return (
    <div>
      <Header logedIn={logedIn} isAdmin={isAdmin}/>
      <Main />
      <Footer />
    </div>
  )
}

export default App
