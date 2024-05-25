import React, { useEffect, useState } from 'react';
import { putIzbornaJedinica } from '../../services/api';
import { useNavigate } from "react-router-dom";

const SifrarnikCreate = () => {
  
    const navigate = useNavigate();

    const [redniBrojIzbJed, setRedniBrojIzbJed] = useState('');
    const [opis, setOpis] = useState('');
    const [brojBiraca, setBrojBiraca] = useState('');

    const handleRedniBrojIzbJedChange = (e) => {
        e.preventDefault();
        setRedniBrojIzbJed(e.target.value);
    };

    const handleOpisChange = (e) => {
        e.preventDefault();
        setOpis(e.target.value);
    };

    const handleBrojBiracaChange = (e) => {
        e.preventDefault();
        setBrojBiraca(e.target.value);
    }; 

    async function handleSubmit(e) {
        e.preventDefault();
        await putIzbornaJedinica(redniBrojIzbJed, opis, brojBiraca).
        then(response => {
            console.log(response.data);
            navigate('/sifrarnik')
        })
        .catch(error => {
            console.error('Error making CREATE request:', error);
        });
    }
  
    return (
      <div>
         <button onClick={() => {navigate('/sifrarnik');}}>Nazad</button>
         <form onSubmit={handleSubmit}>
            <label>
                Redni broj izborne jedinice:
                <input type="text" name="rednibrojizbjed" value={redniBrojIzbJed} onChange={handleRedniBrojIzbJedChange}/>
            </label>
            <label>
                Opis:
                <input type="text" name="opis" value={opis} onChange={handleOpisChange}/>
            </label>
            <label>
                Broj birača:
                <input type="text" name="brojbiraca" value={brojBiraca} onChange={handleBrojBiracaChange}/>
            </label>
            <input type="submit" value="Submit" />
        </form>
      </div>
    );
  };
  
  export default SifrarnikCreate;