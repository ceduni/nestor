import axios from 'axios';

export const fetchAllSpaces = async () => {
  try{
    const res = await axios.get('http://localhost:3000/api/v1/spaces/');
    return res.data;
  } catch (error){
    console.error('Error fetching spaces: ', error);
    throw error;
  }
};