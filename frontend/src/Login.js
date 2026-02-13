import React, { useState } from 'react';
import authService from './services/authService'; // <--- Importamos nuestro servicio
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false); // Feedback visual es vital

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      // 1. Llamada limpia al servicio
      const data = await authService.login(username, password);

      console.log("Login exitoso:", data);
      
      // 2. Notificamos a App.js que el login fue exitoso
      // Nota: Ya no necesitamos guardar en localStorage aquí, el servicio lo hizo.
      onLoginSuccess(data.user_data, data.access);

    } catch (err) {
      console.error(err);
      // Manejo de error más robusto
      if (err.response && err.response.status === 401) {
          setError('Credenciales incorrectas. Intente nuevamente.');
      } else {
          setError('Error de conexión con el servidor.');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img 
          src="DuocUC-1024x252.png" 
          alt="Logo Duoc" 
          style={{ height: '60px', marginBottom: '20px' }} 
        />
        <h2>Acceso Estacionamiento</h2>
        <p>Sistema de Gestión</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Usuario</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ej: guardia"
              autoFocus
              disabled={cargando}
            />
          </div>
          
          <div className="input-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              disabled={cargando}
            />
          </div>

          {error && <div className="error-msg">{error}</div>}

          <button type="submit" className="btn-login" disabled={cargando}>
            {cargando ? 'INGRESANDO...' : 'INGRESAR'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;