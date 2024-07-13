import axios from 'axios';

export const getReservations = async ()=>{
    try{
        const res = await axios.get('http://localhost:3000/api/v1/reservations/');
        return res.data;
    } catch(err){
        console.error('Error fetching reservations : ', err);
        throw error;
    }
}

export const getReservationById = async (id)=>{
    try{
        const res = await axios.get(`http://localhost:3000/api/v1/reservations/${id}`);
        return res.data;
    } catch(err){
        console.error('Error fetching reservation by id: ', err);
        throw error;
    }
}

export const createReservation = async (reservationData) =>{
    try{
        const res = await axios.post('http://localhost:3000/api/v1/reservations/', reservationData);
        return res.data;
    } catch(err){
        console.error('Error creating reservation: ', err);
        throw error;
    }
}

export const updateReservation  = async (id, updateData)=>{
    try{
        const res = axios.put(`http://localhost:3000/api/v1/reservations/${id}`, updateData);
        return res.data;
    } catch(err){
        console.error('Error updating reservation:', error);
        throw error;
    }
}

export const deleteReservation = async (id) => {
    try {
        await axios.delete(`http://localhost:3000/api/v1/reservations/${id}`);
    } catch (error) {
        console.error('Error deleting reservation:', error);
        throw error;
    }
};