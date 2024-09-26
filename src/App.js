import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfile from './components/UserProfile'; // El nuevo componente que se muestra al hacer clic
import HomeUser from './components/HomeUser'; // Tu componente actual

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta para el componente Home */}
        <Route path="/" element={<HomeUser />} />
        {/* Ruta para el perfil del usuario  */}
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
