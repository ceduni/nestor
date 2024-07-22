import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LoginStatusProvider } from "./context/LoginStatusContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReservationsProvider } from './context/ReservationsContext';

const queryClient = new QueryClient();

export default function App() {
  return (
    <LoginStatusProvider>
      <ReservationsProvider>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </ReservationsProvider>
    </LoginStatusProvider>
  );
}
