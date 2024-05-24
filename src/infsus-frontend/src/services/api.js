import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchZastupnici = async (name) => {
  try {
    const response = await api.get(`/zastupnici/${name}`)
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

export const fetchPolitickeStranke = () => api.get('/politickeStranke/all');

export const fetchPolitickaStranka = async (name) => {
  try {
    const response = await api.get(`/politickeStranke/${name}`)
    return response.data;
  } catch (error) {
    console.log(error)
  }
};