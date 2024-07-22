import { createContext, useState, useEffect, useContext } from "react";

const ReservationsContext = createContext();

export function ReservationsProvider({children}){
    const [allReservations, setAllReservations] = useState([]);

    useEffect(()=>{
        fetchAllReservations();
    }, [])

    const fetchAllReservations = async() =>{
        fetch("http://localhost:3000/api/v1/reservations/")
            .then((res) =>{
                return res.json();
            })
            .then(data=>{
                console.log(data);
                setAllReservations(data);
            })
            .catch(err=>console.error(err));
    }

    return (
        <ReservationsContext.Provider value={{allReservations, fetchAllReservations}}>
            {children}
        </ReservationsContext.Provider>
    )
}

export const useReservations = ()=>{
    const context = useContext(ReservationsContext);

    if(!context){
        throw new Error("useReservations must be used within a ReservationsProvider");
    }

    return context;
}