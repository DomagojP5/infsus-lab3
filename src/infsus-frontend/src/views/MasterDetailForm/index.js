import React, { useEffect, useState } from 'react';
import { fetchPolitickaStranka, fetchZastupnici} from '../../services/api';
import { useNavigate } from "react-router-dom";

const MasterDetailForm = () => {

    const navigate = useNavigate(); 
    const [politickaStranka, setPolitickaStranka] = useState([]);
    const [zastupnici, setZastupnici] = useState([]);

    var str = window.location.href;
    var n = str.lastIndexOf('/');
    var result = str.substring(n + 1);
    const name = decodeURIComponent(result.trim(result))

    const getPolitickaStranka = async () => {
      try {
        const response = await fetchPolitickaStranka(name);
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
    useEffect(() => {
      getPolitickaStranka();
      getZastupnici();
    }, []);

    return (
      <div>
        <div>
          <button onClick={() => {navigate('/');}}>Nazad</button>
        </div>
        <h1>Master</h1>
          <div className='name'>
            Ime političke stranke: {politickaStranka.imepolitičkestranke}
          </div>
          <div className='description'>
            Opis stranke: {politickaStranka.kratkiopisstranke}
          </div>
          <div className='type'>
            Vrsta stranke: {politickaStranka.oznakavrstepolitičkestranke}
          </div>
        <div>--------------------------------------</div>
        <h1>Detail</h1>
        <ul>
          {zastupnici.map(zastupnik => (
            <li key={zastupnik.idzastupnika}>
              <div className='atribute'>Zastupnik: {zastupnik.imezastupnika}</div>
              <div className='atribute'>Godine: {zastupnik.godinezastupnika}</div>
              <div className='atribute'>Spol: {zastupnik.spolzastupnika}</div>
              <div className='atribute'>Redni broj izborne jedinice: {zastupnik.rednibrojizbjed}</div>
              <button onClick={() => {navigate(`/zastupnici/${zastupnik.idzastupnika}/edit`)}}>Promijeni</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default MasterDetailForm;