import React from 'react';
import './App.css';
import MasterDetail from './views/MasterDetail/index'
import MasterDetailForm from './views/MasterDetailForm/index'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MasterDetailCreate from './views/MasterDetail/create';
import EditZastupnikForm from './views/MasterDetailForm/edit';
import Sifrarnik from './views/Sifrarnik/index';
import SifrarnikCreate from './views/Sifrarnik/create';
import Header from './component/header'

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MasterDetail/>}/>
          <Route path="/sifrarnik" element={< Sifrarnik/>}/>
          <Route path="/sifrarnik/create" element={< SifrarnikCreate/>}/>
          <Route path="/masterDetailForm/:name" element={<MasterDetailForm/>}/>
          <Route path="/masterDetail/create" element={<MasterDetailCreate/>}/>
          <Route path="/zastupnici/:id/edit" element={<EditZastupnikForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;