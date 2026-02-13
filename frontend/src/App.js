import React, { useState, useEffect } from 'react';
import Login from './Login';
import Mapa from './Mapa'; 

// --- PANELES DE USUARIO ---
import PanelAdmin from './PanelAdmin';     
import PanelGuardia from './PanelGuardia'; 
import PanelVisor from './PanelVisor';     
import PanelProfesor from './PanelProfesor'; 

function App() {
  // --- 1. ESTADOS ---
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  
  // CONTROL DE VISTAS
  const [mostrarLogin, setMostrarLogin] = useState(false); 
  
  // ESTO ES LA CLAVE DE TU PEDIDO:
  // "enDashboard: false" asegura que SIEMPRE inicie mostrando el mapa público.
  const [enDashboard, setEnDashboard] = useState(false); 

  // --- 2. RECUPERAR SESIÓN (Al abrir la app) ---
  useEffect(() => {
    const dataGuardada = localStorage.getItem('user_data');
    const tokenGuardado = localStorage.getItem('token');
    
    if (dataGuardada && tokenGuardado) {
       setUsuario(JSON.parse(dataGuardada));
       setToken(tokenGuardado);
       
       // IMPORTANTE: NO ponemos setEnDashboard(true) aquí.
       // Al dejarlo en false, el usuario aterriza en el Mapa Público,
       // pero el sistema "recuerda" que está logueado para mostrarle el botón de "Ir a mi Panel".
    }
  }, []);

  // --- 3. MANEJADORES ---
  const handleLogin = (datos, tokenRecibido) => {
    setUsuario(datos);
    setToken(tokenRecibido);
    setMostrarLogin(false);
    setEnDashboard(true); // Solo entra directo si te acabas de loguear manualmente.
  };

  const handleLogout = () => {
    localStorage.clear();
    setUsuario(null);
    setToken(null);
    setEnDashboard(false); // Vuelve al mapa público
    setMostrarLogin(false); 
  };

  // --- 4. RENDERIZADO DEL PANEL PRIVADO ---
  const renderPanelPrivado = () => {
      if (!usuario) return null;
      const rol = usuario.rol; 
      
      switch(rol) {
          case 'Guardia': return <PanelGuardia token={token} />;
          case 'Jefe de Seguridad':
          case 'Cetecom':
          case 'Administrador': return <PanelAdmin token={token} rolUsuario={rol} />;
          case 'Director de Sede':
          case 'Subdirectora de Sede': return <PanelVisor token={token} rolUsuario={rol} />;
          case 'Profesor': return <PanelProfesor token={token} usuario={usuario} />;
          default: return <Mapa token={token} />;
      }
  };

  // --- 5. VISTA PRINCIPAL (RETURN) ---

  // CASO A: EL USUARIO QUIERE VER SU PANEL (Hizo clic en "Ir a mi Panel")
  if (usuario && enDashboard) {
       return (
         <div className="App" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Barra superior del usuario logueado */}
            <div style={styles.headerPrivado}>
               <div style={{ display:'flex', alignItems:'center', gap:'15px' }}>
                  <span style={{ color: '#FFB500', fontWeight: 'bold' }}>👤 {usuario.username}</span>
                  <button onClick={() => setEnDashboard(false)} style={styles.btnBack}>
                      ⬅ Volver al Monitor Público
                  </button>
               </div>
               <button onClick={handleLogout} style={styles.btnLogout}>Cerrar Sesión</button>
            </div>
            
            <div style={{ flex: 1, overflow: 'hidden' }}>
                {renderPanelPrivado()}
            </div>
         </div>
       );
  }

  // CASO B: VISTA PÚBLICA (DEFAULT AL INICIAR)
  return (
    <div className="App" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
       
       {/* HEADER PÚBLICO */}
       <div style={styles.headerPublico}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
               {/* Logo o Icono */}
               <div>
                    <img src="DuocUC-1024x252.png" alt="Logo Duoc" style={{ height: '60px', marginBottom: '20px' }} />
                   <div style={{ fontWeight:'bold', fontSize: '1.4rem', letterSpacing: '1px' }}>ESTACIONAMIENTOS DUOC UC</div>
                   <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Disponibilidad en Tiempo Real</div>
               </div>
           </div>

           {/* BOTONES DE ACCESO */}
           <div>
               {usuario ? (
                   // SUB-CASO: Usuario recordado (pero viendo el mapa público)
                   <div style={{ display:'flex', gap:'15px', alignItems:'center' }}>
                       <span style={styles.badgeSesion}>
                           Hola, {usuario.first_name || usuario.username}
                       </span>
                       <button onClick={() => setEnDashboard(true)} style={styles.btnLogin}>
                           📂 IR A MI PANEL
                       </button>
                   </div>
               ) : (
                   // SUB-CASO: Nadie logueado (Visitante)
                   !mostrarLogin ? (
                       <button onClick={() => setMostrarLogin(true)} style={styles.btnLogin}>
                           🔐 Acceso Personal
                       </button>
                   ) : (
                       <button onClick={() => setMostrarLogin(false)} style={styles.btnLogin}>
                           ⬅ Volver al Mapa
                       </button>
                   )
               )}
           </div>
       </div>

       {/* CUERPO (MAPA O LOGIN) */}
       <div style={{ 
           flex: 1, 
           position: 'relative',
       }}>
           
           {mostrarLogin && !usuario ? (
               <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                   <Login onLoginSuccess={handleLogin} />
               </div>
           ) : (
               // MUESTRA EL MAPA PÚBLICO (token={null})
               <Mapa token={null} /> 
           )}
       
       </div>
    </div>
  );
}

// --- ESTILOS ---
const styles = {
    headerPublico: {
        background: '#1817176b', 
        color: 'white', 
        padding: '15px 30px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        zIndex: 100,
        borderBottom: '4px solid #FFB500' // Detalle estético Duoc
    },
    headerPrivado: {
        background: '#101820', 
        color: 'white', 
        padding: '12px 20px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '3px solid #FFB500'
    },
    btnLogin: { 
        background: '#FFB500', 
        color: '#002D5C', 
        border: 'none', 
        padding: '10px 25px', 
        borderRadius: '30px', 
        cursor: 'pointer', 
        fontWeight: 'bold',
        fontSize: '14px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        transition: 'transform 0.2s'
    },
    btnLogout: { 
        background: '#dc3545', 
        color: 'white', 
        border: 'none', 
        padding: '8px 15px', 
        borderRadius: '4px', 
        cursor: 'pointer', 
        fontWeight: 'bold' 
    },
    btnBack: { 
        background: 'transparent', 
        color: '#FFB500', 
        border: '1px solid #FFB500', 
        padding: '6px 12px', 
        borderRadius: '4px', 
        cursor: 'pointer', 
        fontSize:'12px',
        textTransform: 'uppercase'
    },
    badgeSesion: {
        fontSize:'13px', 
        background:'rgba(255, 255, 255, 0.2)', 
        color:'#fff', 
        padding:'8px 12px', 
        borderRadius:'20px', 
        fontWeight: '500'
    }
};

export default App;