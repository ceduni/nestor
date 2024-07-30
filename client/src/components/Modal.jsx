import {addMinutes, format} from "date-fns";
import { IoCalendarClearOutline } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { IoPeople } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import {useEffect, useState} from "react";
import DayCalendar from "./DayCalendar";
export default function Modal({event, setShowModal}) {
    const [date, setDate] = useState(event.start)

    const handleCancelClick = () => {
        setShowModal(false);
        if(typeof event.extendedProps.isBooked !== undefined && !event.extendedProps.isBooked) {
            event.setProp("borderColor", '#84e987')
            event.setProp('textColor', '#000')
            event.setProp('backgroundColor', '#84e987')
        }
        else if (typeof event.extendedProps.isBooked !== undefined && event.extendedProps.isBooked) {
            event.setProp("borderColor", '#df9294')
            event.setProp('textColor', '#000')
            event.setProp('backgroundColor', '#df9294')
        }
    }

    return (
        <div className="border-2 rounded-xl p-4" style={{borderColor: `${event.borderColor}`}}>
            <div className="flex flex-row-reverse" onClick={handleCancelClick}>
                <MdOutlineCancel className="size-6"/>
            </div>
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                    <div className="font-bold">Date</div>
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between gap-2 p-2 border-2 rounded-xl">
                                <div>{format(date,"dd MMM, yyyy")}</div>
                                <IoCalendarClearOutline className="mt-[3px]"/>
                            </div>
                            <DayCalendar setDate={setDate}/>
                        </div>
                        <div className="pt-2 self-start">De</div>
                        <div className="flex gap-2 self-start">
                            <div className="flex p-2 gap-2 border-2 rounded-xl">
                                <div>{format(event.start,"HH:mm")}</div>
                                <CiClock2 className="mt-[3px]"/>
                            </div>
                        </div>
                        <div className="pt-2 self-start">à</div>
                        <div className="flex gap-2 self-start">
                            <div className="flex p-2 gap-2 border-2 rounded-xl">
                                <div>{format(event.end,"HH:mm")}</div>
                                <CiClock2 className="mt-[3px]"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="font-bold">Status</div>
                    <form className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <input type="radio" id="private" className="accent-black"/>
                            <label htmlFor="private" className="ml-2">privée</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="radio" id="public" className="accent-black"/>
                            <label htmlFor="public" className="ml-2">publique</label>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <IoPeople className="mt-1"/>
                        <div className="font-bold">Invités</div>
                    </div>
                    <form className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <input type="text" id="guest" className="h-[35px] w-[200px] pl-2 border-2 rounded-xl focus:outline-black"/>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="font-bold">Activité</div>
                    <form className="">
                        <textarea type="text" id="guest" rows="4" cols="45" className="pl-2 border-2 rounded-xl focus:outline-black"></textarea>
                    </form>
                </div>
                <div className="mt-4 flex flex-row-reverse">
                    <div className="border p-2 rounded-xl font-bold">Réserver</div>
                </div>
            </div>
        </div>

    )
}