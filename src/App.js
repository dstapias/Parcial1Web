import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login'; // Tu componente actual
import Pagina2 from './components/pagina2'; // Tu componente actual

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pagina2" element={<Pagina2 />} />
      </Routes>
    </Router>
  );
};

export default App;
