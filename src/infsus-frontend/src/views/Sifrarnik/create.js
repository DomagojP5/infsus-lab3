import React, { useEffect, useState } from 'react';
import { putIzbornaJedinica, fetchIzborneJedinice } from '../../services/api';
import { useNavigate } from "react-router-dom";

const SifrarnikCreate = () => {
  
    const navigate = useNavigate();

    const [redniBrojIzbJed, setRedniBrojIzbJed] = useState('');
    const [opis, setOpis] = useState('');
    const [brojBiraca, setBrojBiraca] = useState('');
    const [errors, setErrors] = useState({});

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
        const newErrors = {};
        if (!redniBrojIzbJed) newErrors.redniBrojIzbJed = "Redni broj izborne jedinice je obavezan"
        if (isNaN(redniBrojIzbJed)) newErrors.redniBrojIzbJed = "Redni broj izborne jedinice mora biti broj"
        if (redniBrojIzbJed < 0) newErrors.redniBrojIzbJed = "Redni broj izborne jedinice mora biti veći od 0"

        if (!opis) newErrors.opis = "Opis izborne jedinice je obavezan"
        if (opis.length > 200) newErrors.opis = "Opis izborne jedinice mora biti kraći od 200 znakova"

        if (!brojBiraca) newErrors.brojBiraca = "Broj birača je obavezan"
        if (isNaN(brojBiraca)) newErrors.brojBiraca = "Broj birača mora biti broj"
        
        try {
            const response = await fetchIzborneJedinice();
            let maxNumber = response[0].brojbirača;
            let sum = 0;
            for (let i = 1; i < response.length; ++i) {
                sum = sum + response[i].brojbirača;
            }
            let current = sum;
            sum = sum + parseInt(brojBiraca);
            if (sum > maxNumber) newErrors.brojBiraca = "Broj birača je prevelik. Broj slobodnih birača je " + (parseInt(maxNumber) - parseInt(current));
        } catch (error) {
            console.error('Error fetching politicke stranke:', error);
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            await putIzbornaJedinica(redniBrojIzbJed, opis, brojBiraca).
            then(response => {
                console.log(response.data);
                navigate('/sifrarnik')
            })
            .catch(error => {
                console.error('Error making CREATE request:', error);
            });
        }
    }
  
    return (
      <div>
         <button onClick={() => {navigate('/sifrarnik');}}>Nazad</button>
         <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Redni broj izborne jedinice:
                    <input type="text" name="rednibrojizbjed" value={redniBrojIzbJed} onChange={handleRedniBrojIzbJedChange}/>
                </label>
                {errors.redniBrojIzbJed && <div style={{ color: 'red' }}>{errors.redniBrojIzbJed}</div>}
            </div>
            <div>
                <label>
                    Opis:
                    <input type="text" name="opis" value={opis} onChange={handleOpisChange}/>
                </label>
                {errors.opis && <div style={{ color: 'red' }}>{errors.opis}</div>}
            </div>
            <div>
                <label>
                    Broj birača:
                    <input type="text" name="brojbiraca" value={brojBiraca} onChange={handleBrojBiracaChange}/>
                </label>
                {errors.brojBiraca && <div style={{ color: 'red' }}>{errors.brojBiraca}</div>}
                <input type="submit" value="Submit" />
            </div>
        </form>
      </div>
    );
  };
  
  export default SifrarnikCreate;