import React, { useEffect, useState } from 'react';
import { fetchIzborneJedinice, deleteIzbornaJedinica } from '../../services/api';
import { useNavigate } from "react-router-dom";
import './index.css'

const Sifrarnik = () => {
  
  const navigate = useNavigate(); 
  const [izborneJedinice, setIzborneJedinice] = useState([]);
  const [changeState, setChangeState] = useState(false);
  const [query, setQuery] = useState("")

  useEffect(() => {
    const getIzborneJedinice = async () => {
        try {
          const response = await fetchIzborneJedinice();
          setIzborneJedinice(response);
        } catch (error) {
          console.error('Error fetching politicke stranke:', error);
        }
      };
  
      getIzborneJedinice();
    }, [changeState]);

    async function deleteConstituency(rednibrojizbjed) {
        await deleteIzbornaJedinica(rednibrojizbjed).
        then(response => {
            setChangeState(!changeState)
        })
        .catch(error => {
            console.error('Error deleting izborna jedinica:', error);
        });
    }

    const getFilteredItems = (query, items) => {
      if (!query) {
        return items;
      }
      return items.filter((izbornaJedinica) => izbornaJedinica.opis.toLowerCase().includes(query.toLowerCase()));
    }
  
    const filteredItems = getFilteredItems(query, izborneJedinice)
  
    return (
      <div className='app'>
        <h1>Izborne jedinice</h1>

        <div className = "inputBar">
          <label>Pretraži </label>
          <input style={{width: "270px"}} type = "text" onChange = {(e) => {setQuery(e.target.value)}} />
        </div>
        <div className = "searchBar">
          <ul className = "search">
              {filteredItems.map((value) => (
                <div className='searchArea' key={value.rednibrojizbjed}>
                  <div onClick={()=>navigate('./edit/'+value.rednibrojizbjed)}>{value.opis}</div></div>
              ))}
          </ul>
        </div>
        
        <button onClick={() => {
              navigate('./create');
            }}>Stvori novu izbornu jedinicu</button>
        <ul className = "entity">
          {izborneJedinice.sort((a, b) => a.rednibrojizbjed - b.rednibrojizbjed).map(izbornaJedinica => (
            <li className = "entity21" key={izbornaJedinica.rednibrojizbjed}>
                {izbornaJedinica.rednibrojizbjed}
                <div className='description'> 
                  {izbornaJedinica.opis}
                </div>
                {izbornaJedinica.brojbirača}
                <button className='editButton' onClick={() => {
                  navigate('./edit/'+izbornaJedinica.rednibrojizbjed);
                }}>Uredi izbornu jedinicu</button>
                <button onClick={() => {
                  deleteConstituency(izbornaJedinica.rednibrojizbjed);
                }}>Obriši izbornu jedinicu</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Sifrarnik;