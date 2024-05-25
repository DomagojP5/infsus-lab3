import React from 'react';
import './App.css';
import MasterDetail from './views/MasterDetail/index'
import MasterDetailForm from './views/MasterDetailForm/index'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MasterDetailCreate from './views/MasterDetail/create';
import EditZastupnikForm from './views/MasterDetailForm/edit';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MasterDetail/>}/>
          <Route path="/masterDetailForm/:name" element={<MasterDetailForm/>}/>
          <Route path="/masterDetail/create" element={<MasterDetailCreate/>}/>
          <Route path="/zastupnici/:id/edit" element={<EditZastupnikForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;