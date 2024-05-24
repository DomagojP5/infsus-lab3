import React, { useEffect, useState } from 'react';
import { fetchPolitickeStranke } from '../../services/api';
import { useNavigate } from "react-router-dom";

const MasterDetail = () => {
  
  const navigate = useNavigate(); 
  
  function masterDetailForm(imepolitičkestranke) {
    console.log(imepolitičkestranke)
    navigate('/masterDetailForm/'+imepolitičkestranke);
  };

  const [politickeStranke, setPolitickeStranke] = useState([]);
  useEffect(() => {
    const getPolitickeStranke = async () => {
        try {
          const response = await fetchPolitickeStranke();
          setPolitickeStranke(response.data);
        } catch (error) {
          console.error('Error fetching politicke stranke:', error);
        }
      };
  
      getPolitickeStranke();
    }, []);
  
    return (
      <div>
        <h1>Političke stranke</h1>
        <ul>
          {politickeStranke.map(politickaStranka => (
            <li key={politickaStranka.imepolitičkestranke}>
                <button
                  onClick={() => {
                    masterDetailForm(politickaStranka.imepolitičkestranke)
                  }}>{politickaStranka.imepolitičkestranke}</button>
                {politickaStranka.kratkiopisstranke}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default MasterDetail;