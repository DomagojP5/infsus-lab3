import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { fetchIzbornaJedinica, updateIzbornaJedinica, fetchIzborneJedinice } from '../../services/api';

const SifrarnikEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
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

        const newErrors = {};
        if (!izbornaJedinica.rednibrojizbjed) newErrors.redniBrojIzbJed = "Redni broj izborne jedinice je obavezan"
        if (isNaN(izbornaJedinica.rednibrojizbjed)) newErrors.redniBrojIzbJed = "Redni broj izborne jedinice mora biti broj"
        if (izbornaJedinica.rednibrojizbjed < 0) newErrors.redniBrojIzbJed = "Redni broj izborne jedinice mora biti veći od 0"

        if (!izbornaJedinica.opis) newErrors.opis = "Opis izborne jedinice je obavezan"
        if (izbornaJedinica.opis.length > 200) newErrors.opis = "Opis izborne jedinice mora biti kraći od 200 znakova"

        if (!izbornaJedinica.brojbirača) newErrors.brojBiraca = "Broj birača je obavezan"
        if (isNaN(izbornaJedinica.brojbirača)) newErrors.brojBiraca = "Broj birača mora biti broj"

        try { // složenije pravilo
            const response = await fetchIzborneJedinice();
            let maxNumber = 0;
            let sum = 0;
            for (let i = 0; i < response.length; ++i) {
                if (response[i].rednibrojizbjed === 0) {
                    maxNumber = response[i].brojbirača
                } else {
                    sum = sum + parseInt(response[i].brojbirača);
                }
            }
            let current = sum;
            sum = sum + parseInt(izbornaJedinica.brojbirača);
            if (sum > maxNumber) newErrors.brojBiraca = "Broj birača je prevelik. Broj birača koji je ostao slobodan " + (parseInt(maxNumber) - parseInt(current));
        } catch (error) {
            console.error('Error fetching politicke stranke:', error);
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            try {
                await updateIzbornaJedinica(izbornaJedinica);
                navigate('../sifrarnik')
            } catch (error) {
                console.error('Error updating izborna jedinica:', error);
            }
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
                {errors.redniBrojIzbJed && <div style={{ color: 'red' }}>{errors.redniBrojIzbJed}</div>}
                <br />
                <label>
                    Opis:
                    <input type="text" name="opis" value={izbornaJedinica.opis} onChange={handleChange} />
                </label>
                {errors.opis && <div style={{ color: 'red' }}>{errors.opis}</div>}
                <br />
                <label>
                    Broj birača:
                    <input type="number" name="brojbirača" value={izbornaJedinica.brojbirača} onChange={handleChange} />
                </label>
                {errors.brojBiraca && <div style={{ color: 'red' }}>{errors.brojBiraca}</div>}
                <br />
                <button type="submit">Spremi promjene</button>
            </form>}
        </div>
      );
};

export default SifrarnikEdit;