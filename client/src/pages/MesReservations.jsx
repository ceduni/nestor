import React, { useEffect, useState } from "react";
import { getReservations } from "../apis/reservation-api.js";
import {format} from "date-fns";
import { fr } from 'date-fns/locale';

export default function MesReservations() {
    const userId = localStorage.getItem("userid");
    const [userReservations, setUserReservations] = useState([]);


    useEffect(() => {
        getReservations().then((reservations) => setUserReservations(reservations.filter(reservation => reservation.hostId === userId)));
    }, []);

    return (
        <section>
            <header className="pl-5 text-4xl bg-black h-40">
                <h1 className="text-white relative top-12 text-center">Mes Reservations</h1>
            </header>
            <div className="p-4">
                <div className="grid grid-cols-7 border-b p-3 font-bold">
                    <div>Status</div>
                    <div>Invités</div>
                    <div>Date de réservation</div>
                    <div>Début</div>
                    <div>Fin</div>
                    <div>Activité</div>
                </div>
                {userReservations.map((reservation, index) => {
                    let status;
                    if (reservation.status === "confirmed") status = "confirmée";
                    else status = "en cours";

                    return (
                        <div key={index} className="grid grid-cols-7 border-b p-3 items-center">
                            <div className="w-[100px]">{status}</div>
                            <div>{reservation.guestIds.length} personnes</div>
                            <div>{format(reservation.createdAt, "d MMMM yyyy", {locale: fr})}</div>
                            <div>{format(reservation.availability.startAt, "HH:mm", {locale: fr})}</div>
                            <div>{format(reservation.availability.endAt, "HH:mm", {locale: fr})}</div>
                            <div>{reservation.activity}</div>
                            <div className="flex items-center gap-3">
                                <div className="border border-black px-2 rounded-[8px] self-start">
                                    détail
                                </div>
                                <div className="font-bold mb-2">...</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
