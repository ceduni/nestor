const API_URL = 'http://localhost:3000/api/v1/reservations/';

export const getReservations = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error fetching reservations:', err);
        throw err;
    }
};

export const getReservationById = async (id) => {
    try {
        const response = await fetch(`${API_URL}${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error fetching reservation by id:', err);
        throw err;
    }
};

export const createReservation = async (reservationData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservationData)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error creating reservation:', err);
        throw err;
    }
};

export const updateReservation = async (id, updateData) => {
    try {
        const response = await fetch(`${API_URL}${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error updating reservation:', err);
        throw err;
    }
};

export const deleteReservation = async (id) => {
    try {
        const response = await fetch(`${API_URL}${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (err) {
        console.error('Error deleting reservation:', err);
        throw err;
    }
};
