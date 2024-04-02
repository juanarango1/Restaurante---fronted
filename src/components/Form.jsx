
import React, { useState } from 'react';
import './styles/Form.css';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const goTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      setMessage(data.message);
      if (data.user && data.user.role === 'admin') {
        goTo('/administrador');
      }
      if (data.user && data.user.role === 'cocina') {
        goTo('/cocina');
      }
      if (data.user && data.user.role === 'mesero') {
        goTo('/mesero');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <h2>¡Iniciar Sesion!</h2>
        <div>
          <input type="text" placeholder="Nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKeyDown} />

        </div>
        <div>
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} />
        </div>
        <button onClick={handleSubmit}>Iniciar sesión</button>
        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default App;
