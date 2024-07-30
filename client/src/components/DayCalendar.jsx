import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import {useEffect, useState} from "react";
export default function DayCalendar({setDate}) {
    const [value, setValue] = React.useState(dayjs('2022-04-17'));

    useEffect(() => {
        setDate(value.toDate())
    }, [value]);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem>
                <DateCalendar views={['day']} value={value} onChange={(newValue) => setValue(newValue)}/>
            </DemoItem>
        </LocalizationProvider>
    );
}