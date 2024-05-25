import React, { useEffect, useState } from 'react';
import { fetchIzborneJedinice } from '../../services/api';
import { useNavigate } from "react-router-dom";

const Sifrarnik = () => {
  
  const navigate = useNavigate(); 
  const [izborneJedinice, setIzborneJedinice] = useState([]);

  useEffect(() => {
    const getIzborneJedinice = async () => {
        try {
          const response = await fetchIzborneJedinice();
          setIzborneJedinice(response);
        } catch (error) {
          console.error('Error fetching politicke stranke:', error);
        }
      };
  
      getIzborneJedinice();
    }, []);

    async function deleteIzbornaJedinica() {
    //   await deletePolitickaStranka(imepolitickestranke).
    //   then(response => {
    //     console.log(response.data);
    //     setChangeState(!changeState)
    //   })
    //   .catch(error => {
    //       console.error('Error deleting party:', error);
    //   });
    }

    async function editIzbornaJedinica() {
        //   await deletePolitickaStranka(imepolitickestranke).
        //   then(response => {
        //     console.log(response.data);
        //     setChangeState(!changeState)
        //   })
        //   .catch(error => {
        //       console.error('Error deleting party:', error);
        //   });
        }
  
    return (
      <div>
        <h1>Izborne jedinice</h1>
        <button onClick={() => {
              navigate('');
            }}>Stvori novu izbornu jedinicu</button>
        <ul>
          {izborneJedinice.map(izbornaJedinica => (
            <li key={izbornaJedinica.rednibrojizbjed}>
                <button
                  onClick={() => {
                  }}>{izbornaJedinica.rednibrojizbjed}</button>
                {izbornaJedinica.opis}&nbsp;
                {izbornaJedinica.brojbirača}
                <button onClick={() => {
                  editIzbornaJedinica();
                }}>Uredi izbornu jedinicu</button>
                <button onClick={() => {
                  deleteIzbornaJedinica();
                }}>Obriši izbornu jedinicu</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Sifrarnik;