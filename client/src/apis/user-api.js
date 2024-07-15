import axios from 'axios';

export const loginUser = async (username, password)=>{
    try{
        const res = await axios.post(`http://localhost:3000/api/v1/users/login`, {username, password});
        return res.data;
    } catch (err){
        console.error('Error fetching user by id:', error);
        throw error;
    }
}