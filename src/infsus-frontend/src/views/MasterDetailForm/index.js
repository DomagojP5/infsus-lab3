import React, { useEffect, useState } from 'react';
import { fetchPolitickaStranka, fetchZastupnici, fetchImeVrstePolitickeStranke, deleteZastupnik} from '../../services/api';
import { useNavigate } from "react-router-dom";

const MasterDetailForm = () => {

    const navigate = useNavigate(); 
    const [politickaStranka, setPolitickaStranka] = useState([]);
    const [zastupnici, setZastupnici] = useState([]);
    const [imeVrstePolitickeStranke, setImeVrstePolitickeStranke] = useState([]);

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
    useEffect(() => {
      getPolitickaStranka();
      getZastupnici();
    }, []);

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
          <div className='name'>
            Ime političke stranke: {politickaStranka.imepolitičkestranke}
          </div>
          <div className='description'>
            Opis stranke: {politickaStranka.kratkiopisstranke}
          </div>
          <div className='type'>
            Vrsta stranke: {imeVrstePolitickeStranke}
          </div>
        <div>--------------------------------------</div>
        <button onClick={() => {navigate(`/`)}}>Promijeni</button>
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