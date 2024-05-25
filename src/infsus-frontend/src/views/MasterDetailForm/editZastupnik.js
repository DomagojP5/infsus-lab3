import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { fetchZastupnik, updateZastupnik, fetchIzborneJedinice } from '../../services/api';

const EditZastupnikForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [zastupnik, setZastupnik] = useState({
        imezastupnika: '',
        godinezastupnika: '',
        spolzastupnika: '',
        rednibrojizbjed: '',
        imepolitickestranke: ''
    });
    const [izborneJedinice, setIzborneJedinice] = useState([]);

    const fetchJedinice = async () => {
        try {
            const data = await fetchIzborneJedinice();
            setIzborneJedinice(data);
        } catch (error) {
            console.error('Error fetching izborne jedinice:', error);
        }
    }

    const getZastupnik = async () => {
        try {
            const response = await fetchZastupnik(id);
            setZastupnik(response);
        } catch (error) {
            console.error('Error fetching zastupnik:', error)
        }
    };

    useEffect(() => {

        getZastupnik();
        fetchJedinice();
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setZastupnik((prevZastupnik) => ({
            ...prevZastupnik,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateZastupnik(id, zastupnik);
            navigate(`/masterDetailForm/${zastupnik.imepolitičkestranke}`)
        } catch (error) {
            console.error('Error updating zastupnik:', error);
        }
    };

    return (
        <div>
            <button onClick={() => {navigate(`/masterDetailForm/${zastupnik.imepolitičkestranke}`);}}>Nazad</button>
            <h2>Promijeni podatke o zastupniku</h2>
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
                                { jedinica.opis}
                            </option>
                            )
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Ime političke stranke:
                    <input type="text" name="imepolitickestranke" value={zastupnik.imepolitičkestranke} disabled 
                    onChange={handleChange} style={{ width: '15%', minWidth: '200px' }} />
                </label>
                <br />
                <button type="submit">Spremi promjene</button>
            </form>
        </div>
      );

};

export default EditZastupnikForm;