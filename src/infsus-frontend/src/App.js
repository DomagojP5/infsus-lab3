import React from 'react';
import './App.css';
import MasterDetail from './views/MasterDetail/index'
import MasterDetailForm from './views/MasterDetailForm/index'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MasterDetail/>}/>
          <Route path="/masterDetail" element={<MasterDetail/>}/>
          <Route path="/masterDetailForm/:name" element={<MasterDetailForm/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;