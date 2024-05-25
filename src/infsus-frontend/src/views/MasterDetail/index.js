import React, { useEffect, useState } from 'react';
import { fetchPolitickeStranke, deletePolitickaStranka, fetchImeVrstePolitickeStranke, fetchVrstePolitickeStranke } from '../../services/api';
import { useNavigate } from "react-router-dom";

const MasterDetail = () => {
  
  const navigate = useNavigate(); 
  const [politickeStranke, setPolitickeStranke] = useState([]);
  const [changeState, setChangeState] = useState(false);
  const [vrstePolitickeStranke, setVrstePolitickeStranke] = useState([]);
  
  function masterDetailForm(imepolitičkestranke) {
    navigate('/masterDetailForm/'+imepolitičkestranke);
  };

  useEffect(() => {
    const getPolitickeStranke = async () => {
        try {
          const response = await fetchPolitickeStranke();
          setPolitickeStranke(response.data);
        } catch (error) {
          console.error('Error fetching politicke stranke:', error);
        }
      };
    
    const getVrsteStranke = async () => {
      try {
        const response = await fetchVrstePolitickeStranke();
        setVrstePolitickeStranke(response); 
      } catch (error) {
        console.error('Error fetching vrstu politicke stranke:', error);
      }
    };
  
      getPolitickeStranke();
      getVrsteStranke();
    }, [changeState]);

    async function deleteParty(imepolitickestranke) {
      await deletePolitickaStranka(imepolitickestranke).
      then(response => {
        console.log(response.data);
        setChangeState(!changeState)
      })
      .catch(error => {
          console.error('Error deleting party:', error);
      });
  }
  
    return (
      <div>
        <h1>Političke stranke</h1>
        <button onClick={() => {
              navigate('/masterDetail/create');
            }}>Stvori novu stranku</button>
        <ul>
          {politickeStranke.map(politickaStranka => (
            <li key={politickaStranka.imepolitičkestranke}>
                <button
                  onClick={() => {
                    masterDetailForm(politickaStranka.imepolitičkestranke)
                  }}>{politickaStranka.imepolitičkestranke}</button>
                {politickaStranka.kratkiopisstranke}&nbsp;
                {politickaStranka.oznakavrstepolitičkestranke}
                {vrstePolitickeStranke.find(vrsta => vrsta.oznakavrstepolitičkestranke === politickaStranka.oznakavrstepolitičkestranke) &&
                  <span>
                    &nbsp;-&nbsp;
                    {vrstePolitickeStranke.find(vrsta => vrsta.oznakavrstepolitičkestranke === politickaStranka.oznakavrstepolitičkestranke).imevrstepolitičkestranke}
                  </span>
                }
                <button onClick={() => {
                  deleteParty(politickaStranka.imepolitičkestranke);
                }}>Obriši stranku</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default MasterDetail;