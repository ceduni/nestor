import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { LoginStatusProvider } from './context/LoginStatusContext'

export default function App() {

  return (
    <LoginStatusProvider>
      <Header />
      <Outlet />
      <Footer />
    </LoginStatusProvider>
  )
}
