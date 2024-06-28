import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  // Modes pour nav items
  const [logedIn, setLogedin] = useState(false);
  const [isAdmin, setIsadmin] = useState(false);
  const [data, setData] = useState(null);

  useEffect(()=>{
    fetch('http://localhost:3000/api/v1/spaces/')
      .then(res => {
        console.log("res : " + res);
        return res.json();
      })
      .then(data => {
        console.log("data : " + data);
        setData(data);
      })
      .catch(error => console.error(error));
  }, []);
  console.log(data)

  return (
    <div>
      <Header logedIn={logedIn} isAdmin={isAdmin}/>
      <Outlet />
      <Footer />
      {data ? <p>{data.hello}</p> : <p>no msg</p>}
    </div>
  )
}

export default App
