import React, { useEffect, useState } from 'react';
import { fetchZastupnici } from '../../services/api';

const MasterDetail = () => {
  const [zastupnik, setZastupnik] = useState([]);

  useEffect(() => {
    const getZastupnik = async () => {
        try {
          const response = await fetchZastupnici();
          setZastupnik(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      getZastupnik();
    }, []);
  
    return (
      <div>
        <h1>Zastupnici</h1>
        <ul>
          {zastupnik.map(zastupnik => (
            <li key={zastupnik.idzastupnika}>
              {zastupnik.imezastupnika}&nbsp;
              {zastupnik.godinezastupnika}&nbsp;
              {zastupnik.spolzastupnika}&nbsp;
              {zastupnik.rednibrojizbjed}&nbsp;
              {zastupnik.imepolitičkestranke} 
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default MasterDetail;