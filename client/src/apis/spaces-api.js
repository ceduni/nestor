import axios from 'axios';

export const getSpaces = async () => {
  try{
    const res = await axios.get('http://localhost:3000/api/v1/spaces');
    return res.data;
  } catch (error){
    console.error('Error fetching spaces: ', error);
    throw error;
  }
};

export const getSpaceById = async (id)=>{
    try{
        const res = await axios.get(`http://localhost:3000/api/v1/spaces/${id}`);
        return res.data;
    } catch(err){
        console.error('Error fetching space by id:', error);
        throw error;
    }
}

export const createSpace = async (spaceData) =>{
    try{
        const res = await axios.post(`http://localhost:3000/api/v1/spaces`, spaceData);
        return res.data;
    } catch(err){
        console.error('Error creating space:', error);
        throw error;
    }
}

export const updateSpace = async (id, updateData) =>{
    try{
        const res = await axios.put(`http://localhost:3000/api/v1/spaces/${id}`, updateData);
        return res.data;
    } catch(err){
        console.error('Error updating space:', error);
        throw error;
    }
}

export const deleteSpace = async (id)=>{
    try{
        const res = await axios.delete(`http://localhost:3000/api/v1/spaces/${id}`);
        return res.data;
    } catch(err){
        console.error('Error deleting space:', error);
        throw error;
    }
}