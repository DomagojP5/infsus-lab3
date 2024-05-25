import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createZastupnik, fetchIzborneJedinice } from '../../services/api';

const AddZastupnikForm = () => {
    const { name }= useParams();
    const navigate = useNavigate();
    const [zastupnik, setZastupnik] = useState({
        imezastupnika: '',
        godinezastupnika: '',
        spolzastupnika: 'm',
        rednibrojizbjed: '1',
        imepolitičkestranke: name
    });
    const [izborneJedinice, setIzborneJedinice] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setZastupnik(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createZastupnik(zastupnik.imepolitičkestranke, zastupnik); 
            navigate(`/masterDetailForm/${zastupnik.imepolitičkestranke}`);
        } catch (error) {
            console.error('Error creating zastupnik:', error);
        }
    };

    const fetchJedinice = async () => {
        try {
            const data = await fetchIzborneJedinice();
            setIzborneJedinice(data);
        } catch (error) {
            console.error('Error fetching izborne jedinice:', error);
        }
    }

    useEffect(() => {
        fetchJedinice();
    }, [])

    return (
        <div>
            <button onClick={() => {navigate(`/masterDetailForm/${zastupnik.imepolitičkestranke}`);}}>Nazad</button>
            <h2>Dodaj zastupnika</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Ime zastupnika:
                    <input type="text" name="imezastupnika" value={zastupnik.imezastupnika} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Godine:
                    <input type="number" name="godinezastupnika" value={zastupnik.godinezastupnika} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Spol:
                    <select name="spolzastupnika" value={zastupnik.spolzastupnika} onChange={handleChange}>
                        <option value="m">m</option>
                        <option value="ž">ž</option>
                    </select>
                </label>
                <br />
                <label>
                    Redni broj izborne jedinice:
                    <select name="rednibrojizbjed" value={zastupnik.rednibrojizbjed} onChange={handleChange}>
                        {izborneJedinice.map((jedinica) => (
                            jedinica.rednibrojizbjed !== 0 && (
                            <option key={jedinica.rednibrojizbjed} value={jedinica.rednibrojizbjed}>
                                {jedinica.rednibrojizbjed}
                            </option>
                            )
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Ime političke stranke:
                    <input type="text" name="imepolitičkestranke" value={zastupnik.imepolitičkestranke} disabled 
                    onChange={handleChange} style={{ width: '15%', minWidth: '200px' }}/>
                </label>
                <br />
                <button type="submit">Dodaj zastupnika</button>
            </form>
        </div>
    );
};

export default AddZastupnikForm;
