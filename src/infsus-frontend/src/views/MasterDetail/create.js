import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { putPolitickaStranka, fetchPolitickeStranke} from '../../services/api';

const MasterDetailCreate = () => {

    const navigate = useNavigate();

    const [imepolitickestranke, setImepolitickestranke] = useState('');
    const [kratkiopisstranke, setKratkiopisstranke] = useState('');
    const [oznakavrstepolitickestranke, setOznakaVrstePolitickeStranke] = useState('');
    const [errors, setErrors] = useState({});

    const handleImeChange = (e) => {
        e.preventDefault();
        setImepolitickestranke(e.target.value);
    };

    const handleOpisChange = (e) => {
        e.preventDefault();
        setKratkiopisstranke(e.target.value);
    };

    const handleVrstaChange = (e) => {
        e.preventDefault();
        setOznakaVrstePolitickeStranke(e.target.value);
    }; 

    async function handleSubmit(e) {
        e.preventDefault();
        const newErrors = {};

        if (!imepolitickestranke) newErrors.imepolitickestranke = "Ime političke stranke je obavezno"
        if (!isNaN(imepolitickestranke.charAt(0))) newErrors.imepolitickestranke = "Ime političke stranke ne smije počinjati s brojem"
        if (imepolitickestranke.length > 200) newErrors.imepolitickestranke = "Ime političke stranke mora imati manje od 200 znakova"

        try { // složenije pravilo
            const response = (await fetchPolitickeStranke()).data; 
            for (let i = 0; i < response.length; ++i) {
                if (response[i].imepolitičkestranke === imepolitickestranke) {
                    newErrors.imepolitickestranke = "Ovo ime političke stranke već postoji"
                }
            }
          } catch (error) {
            console.error('Error fetching politicke stranke:', error);
          }

        if (!kratkiopisstranke) newErrors.kratkiopisstranke = "Opis stranke je obavezan"
        if (kratkiopisstranke.length > 200) newErrors.kratkiopisstranke = "Opis stranke mora biti manji od 200 znakova"

        if (!oznakavrstepolitickestranke) newErrors.oznakavrstepolitickestranke = "Oznaka vrste političke stranke je obavezna"
        //if (isNaN(oznakavrstepolitickestranke)) newErrors.oznakavrstepolitickestranke = "" // treba dodati da se bira ime vrste pol. stranke, a ne oznaka

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            await putPolitickaStranka(imepolitickestranke, kratkiopisstranke, oznakavrstepolitickestranke).
            then(response => {
                console.log(response.data);
                navigate('/')
            })
            .catch(error => {
                console.error('Error making PUT request:', error);
            });
        }
    }

    return (
      <div>
        <button onClick={() => {navigate('/');}}>Nazad</button>
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Ime stranke:
                    <input type="text" name="imepolitickestranke" value={imepolitickestranke} onChange={handleImeChange}/>
                </label>
                {errors.imepolitickestranke && <div style={{ color: 'red' }}>{errors.imepolitickestranke}</div>}
            </div>
            <div>
                <label>
                    Opis stranke:
                    <input type="text" name="kratkiopisstranke" value={kratkiopisstranke} onChange={handleOpisChange}/>
                </label>
                {errors.kratkiopisstranke && <div style={{ color: 'red' }}>{errors.kratkiopisstranke}</div>}
            </div>
            <div>
                <label>
                    Oznaka vrste političke stranke:
                    <input type="text" name="oznakavrstepolitickestranke" value={oznakavrstepolitickestranke} onChange={handleVrstaChange}/>
                </label>
                {errors.oznakavrstepolitickestranke && <div style={{ color: 'red' }}>{errors.oznakavrstepolitickestranke}</div>}
                <input type="submit" value="Submit" />
            </div>
        </form>
      </div>
    );
  };
  
  export default MasterDetailCreate;