import React, { useEffect} from 'react';
import './header.css';
import { useNavigate } from "react-router-dom";

const Header = () => {
  
  const navigate = useNavigate(); 

  useEffect(() => {

    }, []);

    return (
      <div className='header'>
        <div className='site'>
          <button className = "buttonLink" onClick={() => {navigate('/')}}>Master-detail</button>
        </div>
        <div className='site'>
          <button className = "buttonLink" onClick={() => {navigate('/sifrarnik')}}>Šifrarnik detaila</button>
        </div>
      </div>
    );
  };
  
  export default Header;