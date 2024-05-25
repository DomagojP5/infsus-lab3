import React, { useEffect, useState } from 'react';
import { fetchIzborneJedinice, deleteIzbornaJedinica } from '../../services/api';
import { useNavigate } from "react-router-dom";

const Sifrarnik = () => {
  
  const navigate = useNavigate(); 
  const [izborneJedinice, setIzborneJedinice] = useState([]);
  const [changeState, setChangeState] = useState(false);

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
    }, [changeState]);

    async function deleteConstituency(rednibrojizbjed) {
        await deleteIzbornaJedinica(rednibrojizbjed).
        then(response => {
            setChangeState(!changeState)
        })
        .catch(error => {
            console.error('Error deleting izborna jedinica:', error);
        });
    }

    async function editIzbornaJedinica() {

    }
  
    return (
      <div>
        <h1>Izborne jedinice</h1>
        <button onClick={() => {
              navigate('./create');
            }}>Stvori novu izbornu jedinicu</button>
        <ul>
          {izborneJedinice.sort((a, b) => a.rednibrojizbjed - b.rednibrojizbjed).map(izbornaJedinica => (
            <li key={izbornaJedinica.rednibrojizbjed}>
                {izbornaJedinica.rednibrojizbjed}&nbsp;
                {izbornaJedinica.opis}&nbsp;
                {izbornaJedinica.brojbirača}
                <button onClick={() => {
                  navigate('./edit/'+izbornaJedinica.rednibrojizbjed);
                }}>Uredi izbornu jedinicu</button>
                <button onClick={() => {
                  deleteConstituency(izbornaJedinica.rednibrojizbjed);
                }}>Obriši izbornu jedinicu</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Sifrarnik;