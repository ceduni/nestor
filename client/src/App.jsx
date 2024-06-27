import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

function App() {
  // Modes pour nav items
  const [logedIn, setLogedin] = useState(false);
  const [isAdmin, setIsadmin] = useState(false);
  const [data, setData] = useState(null);

  useEffect(()=>{
    fetch('/api/data')
      .then(res => {
        console.log("res : " + res);
        res.json();
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
      <Main />
      <Footer />
      {data ? <p>{data.hello}</p> : <p>no msg</p>}
    </div>
  )
}

export default App
