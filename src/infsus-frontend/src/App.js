import React from 'react';
import './App.css';
import MasterDetail from './views/MasterDetail/index'
import MasterDetailForm from './views/MasterDetailForm/index'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MasterDetailCreate from './views/MasterDetail/create';
import EditZastupnikForm from './views/MasterDetailForm/editZastupnik';
import Sifrarnik from './views/Sifrarnik/index';
import SifrarnikCreate from './views/Sifrarnik/create';
import Header from './component/header'
import AddZastupnikForm from './views/MasterDetailForm/addZastupnik';

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
          <Route path="/zastupnici/add/:name" element={<AddZastupnikForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;