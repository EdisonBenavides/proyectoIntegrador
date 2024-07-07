import React from 'react';
import Login from './pages/Login';

const App = () => {
  return (
    <div className="app">
      <div className="imagen-fondo">
        <img src="img/fondo1.jpg" alt="Fondo decorativo de la aplicación" />
      </div>
      <Login />
    </div>
  );
}

export default App;