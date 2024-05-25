import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

//politicka stranka
export const fetchPolitickeStranke = () => api.get('/politickeStranke/all');

export const fetchPolitickaStranka = async (name) => {
  try {
    const response = await api.get(`/politickeStranke/${name}`)
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

export const putPolitickaStranka = async (imepolitickestranke, kratkiopisstranke, oznakavrstepolitickestranke) => {
  try {
    const response = await api.put(`/politickeStranke/create/${imepolitickestranke}/${kratkiopisstranke}/${oznakavrstepolitickestranke}`)
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

export const deletePolitickaStranka = async (imepolitickestranke) => {
  try {
    const response = await api.delete(`/politickeStranke/delete/${imepolitickestranke}`)
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

//zastupnik
export const fetchZastupnici = async (name) => {
  try {
    const response = await api.get(`/zastupnici/${name}`)
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

export const fetchZastupnik = async (id) => {
  try {
    console.log(`Fetching zastupnik with id: ${id}`);
    const response = await api.get(`/zastupnici/${id}/edit`);
    console.log('Response received from API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching zastupnik by id inside api.js:', error)
  }

};

export const updateZastupnik = async (id, data) => {
  try {    
    const response = await api.put(`/zastupnici/${id}/edit`, data)
    return response.data
  } catch (error) {
    console.log('Error updating zastupnik in api.js:', error);
  }
};

//vrsta politicke stranke
export const fetchImeVrstePolitickeStranke = async (id) => {
  try {
    const response = await api.get(`/vrstaPolitickeStranke/${id}`)
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

//izborne jedinice
export const fetchIzborneJedinice = async () => {
  try {
    const response = await api.get(`/izborneJedinice`)
    return response.data;
  } catch (error) {
    console.log(error)
  }
};