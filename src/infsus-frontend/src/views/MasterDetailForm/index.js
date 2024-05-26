import React, { useEffect, useState } from 'react';
import { fetchPolitickaStranka, fetchZastupnici, fetchImeVrstePolitickeStranke, deleteZastupnik, updatePolitickaStranka, fetchVrstePolitickeStranke} from '../../services/api';
import { useNavigate } from "react-router-dom";

const MasterDetailForm = () => {

    const navigate = useNavigate(); 

    const [politickaStranka, setPolitickaStranka] = useState({
      imepolitičkestranke: '',
      kratkiopisstranke: '',
      oznakavrstepolitičkestranke: ''
    });
    const [zastupnici, setZastupnici] = useState([]);
    const [imeVrstePolitickeStranke, setImeVrstePolitickeStranke] = useState([]);
    const [vrstePolitickeStranke, setVrstePolitickeStranke] = useState([]);
    const [errors, setErrors] = useState({});

    var str = window.location.href;
    var n = str.lastIndexOf('/');
    var result = str.substring(n + 1);
    const name = decodeURIComponent(result.trim(result))

    const getPolitickaStranka = async () => {
      try {
        const response = await fetchPolitickaStranka(name);
        const imevrstepolitičkestranke = await fetchImeVrstePolitickeStranke(response.oznakavrstepolitičkestranke)
        setImeVrstePolitickeStranke(imevrstepolitičkestranke)
        setPolitickaStranka(response);
      } catch (error) {
        console.error('error with fetching political party', error);
      }
    };

    const getZastupnici = async () => {
      try {
          const response = await fetchZastupnici(name);
          setZastupnici(response);
      } catch (error) {
          console.error('Error fetching zastupnici:', error);
      }
    };

    const getVrsteStranka = async () => {
      try {
          const response = await fetchVrstePolitickeStranke();
          setVrstePolitickeStranke(response);
      } catch (error) {
          console.error('Error fetching politicke stranke:', error);
      }
    };

    useEffect(() => {
      getPolitickaStranka();
      getZastupnici();
      getVrsteStranka();
    }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setPolitickaStranka(prevData => ({
        ...prevData,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = {};
      if (!politickaStranka.kratkiopisstranke) newErrors.kratkiopisstranke = "Opis stranke je obavezan"
      if (politickaStranka.kratkiopisstranke.length > 200) newErrors.kratkiopisstranke = "Opis stranke mora biti kraći od 200 znakova"
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        try {
          await updatePolitickaStranka(name, politickaStranka);
          navigate(`/masterDetailForm/${politickaStranka.imepolitičkestranke}`);
        } catch (error) {
          console.error('Error updating political party:', error);
        }
      }
    };

    const izbrisiZastupnika = async(imezastupnika, imepolitičkestranke) => {
      try {
        const respone = await deleteZastupnik(imezastupnika, imepolitičkestranke);
        await getZastupnici();
      } catch (error) {
        console.error('Error deleting zastupnik:', error);
      }
    }

    return (
      <div>
        <div>
          <button onClick={() => {navigate('/');}}>Nazad</button>
        </div>
        <h1>Master</h1>
        <form onSubmit={handleSubmit}>
          <div className='name'>
            Ime političke stranke:
            <input
              type="text"
              name="imepolitičkestranke"
              value={politickaStranka.imepolitičkestranke}
              disabled
              onChange={handleChange}
              style={{width:'20%'}}
            />
          </div>
          <div className='description'>
            Opis stranke:
            <textarea
              name="kratkiopisstranke"
              rows="4"
              cols="50"
              value={politickaStranka.kratkiopisstranke}
              onChange={handleChange}
            />
          </div>
          {errors.kratkiopisstranke && <div style={{ color: 'red' }}>{errors.kratkiopisstranke}</div>}
          <div className='type'>
            Vrsta stranke:
            <select 
            name="oznakavrstepolitičkestranke" 
            value={politickaStranka.oznakavrstepolitičkestranke} onChange={handleChange}>
              {vrstePolitickeStranke.map((vrsta) => (
                <option key={vrsta.oznakavrstepolitičkestranke} value={vrsta.oznakavrstepolitičkestranke}>
                  {vrsta.imevrstepolitičkestranke}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Spremi promjene</button>
        </form>
        <div>--------------------------------------</div>
        <h1>Detail</h1>
        <button onClick={() => {navigate(`/zastupnici/add/${name}`)}}>Dodaj</button>
        <ul>
          {zastupnici.map(zastupnik => (
            <li key={zastupnik.idzastupnika}>
              <div className='atribute'>Zastupnik: {zastupnik.imezastupnika}</div>
              <div className='atribute'>Godine: {zastupnik.godinezastupnika}</div>
              <div className='atribute'>Spol: {zastupnik.spolzastupnika}</div>
              <div className='atribute'>Redni broj izborne jedinice: {zastupnik.rednibrojizbjed}</div>
              <button onClick={() => {navigate(`/zastupnici/${zastupnik.idzastupnika}/edit`)}}>Promijeni</button>
              <button onClick={() => {izbrisiZastupnika(zastupnik.imezastupnika, zastupnik.imepolitičkestranke)}}>Izbriši</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default MasterDetailForm;