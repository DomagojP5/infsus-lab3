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
    const response = await api.get(`/zastupnici/${id}/edit`);
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

export const createZastupnik = async (stranka, zastupnikData) => {
  try {
    const response = await api.post(`/zastupnici/add/${stranka}`, zastupnikData);
    return response.data
  } catch (error) {
    console.error('Error creating zastupnik', error);
  }
};

export const deleteZastupnik = async (imezastupnika, imepolitičkestranke) => {
  try {
    const response = await api.delete(`/zastupnici/delete/${imezastupnika}/${imepolitičkestranke}`)
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

//vrsta politicke stranke
export const fetchImeVrstePolitickeStranke = async (id) => {
  try {
    const response = await api.get(`/vrstaPolitickeStranke/${id}`)
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

export const fetchVrstePolitickeStranke = async () => {
  try {
    const response = await api.get(`/vrstaPolitickeStranke/all`)
    return response.data;
  } catch (error) {
    console.error('Error fetching vrste politicke stranke:', error);
    return [];
  }
};

//izborne jedinice
export const fetchIzborneJedinice = async () => {
  try {
    const response = await api.get(`/izborneJedinice/all`)
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

//izborne jedinice
export const putIzbornaJedinica = async (redniBrojIzbJed, opis, brojBiraca) => {
  try {
    const response = await api.put(`/izborneJedinice/create/${redniBrojIzbJed}/${opis}/${brojBiraca}`)
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

export const deleteIzbornaJedinica = async (redniBrojIzbJed) => {
  try {
    const response = await api.delete(`/izborneJedinice/delete/${redniBrojIzbJed}`)
    return response.data;
  } catch (error) {
    console.log(error)
  }
};