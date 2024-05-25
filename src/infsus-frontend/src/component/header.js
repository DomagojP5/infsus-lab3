import React, { useEffect, useState } from 'react';
import './header.css';
import { useNavigate } from "react-router-dom";

const Header = () => {
  
  //const navigate = useNavigate(); 
  //const [, ] = useState([]);

  useEffect(() => {

    }, []);

    return (
      <div className='header'>
        <div className='site'>
            <a href='/' className='navbar-item-link'>Master-detail</a>
        </div>
        <div className='site'>
            <a href='/sifrarnik' className='navbar-item-link'>Šifrarnika detaila</a>
        </div>
      </div>
    );
  };
  
  export default Header;