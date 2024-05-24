import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { putPolitickaStranka} from '../../services/api';

const MasterDetailCreate = () => {

    const navigate = useNavigate();

    const [imepolitickestranke, setImepolitickestranke] = useState('');
    const [kratkiopisstranke, setKratkiopisstranke] = useState('');
    const [oznakavrstepolitickestranke, setOznakaVrstePolitickeStranke] = useState('');

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
        await putPolitickaStranka(imepolitickestranke, kratkiopisstranke, oznakavrstepolitickestranke).
        then(response => {
            console.log(response.data);
            navigate('/')
        })
        .catch(error => {
            console.error('Error making PUT request:', error);
        });
    }

    return (
      <div>
        <button onClick={() => {navigate('/');}}>Nazad</button>
        <form onSubmit={handleSubmit}>
            <label>
                Ime stranke:
                <input type="text" name="imepolitickestranke" value={imepolitickestranke} onChange={handleImeChange}/>
            </label>
            <label>
                Opis stranke:
                <input type="text" name="kratkiopisstranke" value={kratkiopisstranke} onChange={handleOpisChange}/>
            </label>
            <label>
                Oznaka vrste političke stranke:
                <input type="text" name="oznakavrstepolitickestranke" value={oznakavrstepolitickestranke} onChange={handleVrstaChange}/>
            </label>
            <input type="submit" value="Submit" />
        </form>
      </div>
    );
  };
  
  export default MasterDetailCreate;