import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { fetchIzbornaJedinica, updateIzbornaJedinica } from '../../services/api';

const SifrarnikEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [izbornaJedinica, setIzbornaJedinica] = useState({
        rednibrojizbjed: '',
        opis: '',
        brojbirača: '',
    });

    useEffect(() => {
        const fetchJedinica = async () => {
            try {
                const data = await fetchIzbornaJedinica(id);
                setIzbornaJedinica(data);
            } catch (error) {
                console.error('Error fetching izborne jedinice:', error);
            }
        }

        fetchJedinica();
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setIzbornaJedinica((prevIzbornaJedinica) => ({
            ...prevIzbornaJedinica,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateIzbornaJedinica(izbornaJedinica);
            navigate('../sifrarnik')
        } catch (error) {
            console.error('Error updating izborna jedinica:', error);
        }
    };

    return (
        <div>
            <button onClick={() => {
              navigate('../sifrarnik');
            }}>Nazad</button>
            {
            <form onSubmit={handleSubmit}>
                <label>
                    Redni broj izborne jedinice:
                    <input type="text" name="rednibrojizbjed" value={izbornaJedinica.rednibrojizbjed} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Opis:
                    <input type="text" name="opis" value={izbornaJedinica.opis} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Broj birača:
                    <input type="number" name="brojbirača" value={izbornaJedinica.brojbirača} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Spremi promjene</button>
            </form>}
        </div>
      );
};

export default SifrarnikEdit;