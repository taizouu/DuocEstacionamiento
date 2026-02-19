import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './assets/App.css'; 

// --- IMPORTAMOS VISTAS ---
import Monitor from './pages/Public/Monitor'; // Tu nueva vista pública
import Login from './pages/Auth/Login';

// --- PANELES ---
import PanelAdmin from './pages/Dashboard/PanelAdmin';
import PanelGuardia from './pages/Dashboard/PanelGuardia';
import PanelVisor from './pages/Dashboard/PanelVisor';
import PanelProfesor from './pages/Dashboard/PanelProfesor';
import Mapa from './components/Mapa'; // Fallback

// ==========================================
// COMPONENTE: RUTA PRIVADA (Dashboard)
// ==========================================
// Este componente actúa como un "Guardia". 
// Si no hay token, te patea al Login.
// Si hay token, revisa tu rol y te muestra el panel correcto.
const DashboardPrivado = () => {
    const navigate = useNavigate();
    const dataGuardada = localStorage.getItem('user_data');
    const token = localStorage.getItem('token');

    // 1. Si no hay sesión, volver al login
    if (!dataGuardada || !token) {
        return <Navigate to="/login" replace />;
    }

    const usuario = JSON.parse(dataGuardada);
    const rol = usuario.rol;

    // 2. Función de Cerrar Sesión
    const handleLogout = () => {
        localStorage.clear();
        navigate('/'); // Nos devuelve al Monitor público
    };

    // 3. Header Privado Común
    const HeaderPrivado = () => (
        <div style={styles.headerPrivado}>
            <div style={{ display:'flex', alignItems:'center', gap:'15px' }}>
                <span style={{ color: '#FFB500', fontWeight: 'bold' }}>👤 {usuario.username}</span>
            </div>
            <button onClick={handleLogout} style={styles.btnLogout}>Cerrar Sesión</button>
        </div>
    );

    // 4. Selector de Panel según Rol
    const renderPanel = () => {
        switch(rol) {
            case 'Guardia': return <PanelGuardia />;
            case 'Jefe de Seguridad': return <PanelAdmin rolUsuario={rol} />;
            case 'Cetecom': return <PanelAdmin rolUsuario={rol} />;
            case 'Director de Sede':
            case 'Subdirectora de Sede': return <PanelVisor rolUsuario={rol} />;
            case 'Profesor': return <PanelProfesor usuario={usuario} />;
            default: return <Mapa />;
        }
    };

    return (
        <div className="App" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <HeaderPrivado />
            <div style={{ flex: 1, overflow: 'hidden' }}>
                {renderPanel()}
            </div>
        </div>
    );
};

// ==========================================
// COMPONENTE: PAGINA DE LOGIN (Wrapper)
// ==========================================
const PaginaLogin = () => {
    const navigate = useNavigate();

    const alLoguearse = (datos, token) => {
        // Guardamos ya en authService, pero por seguridad refrescamos el estado
        // Redirigimos al Dashboard
        navigate('/dashboard');
    };

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f4f6f9' }}>
            <Login onLoginSuccess={alLoguearse} />
        </div>
    );
};

// ==========================================
// COMPONENTE PRINCIPAL APP (ROUTER)
// ==========================================
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA 1: El monitor público (Pantalla Inicial) */}
        <Route path="/" element={<Monitor />} />

        {/* RUTA 2: El Login */}
        <Route path="/login" element={<PaginaLogin />} />

        {/* RUTA 3: El Dashboard Privado (Protegido) */}
        <Route path="/dashboard" element={<DashboardPrivado />} />

        {/* RUTA COMODÍN: Si escriben cualquier cosa rara, mandar al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

// Estilos Auxiliares
const styles = {
    headerPrivado: { background: '#101820', color: 'white', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px solid #FFB500' },
    btnLogout: { background: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
};

export default App;