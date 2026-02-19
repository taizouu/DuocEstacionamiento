import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Mapa from '../../components/Mapa'; 
// Eliminamos la importación de 'api' porque ya no pediremos el historial aquí
import '../../assets/App.css'; 

const Monitor = () => {
  const navigate = useNavigate(); 
  const [usuario, setUsuario] = useState(null);
  const [mostrarMenu, setMostrarMenu] = useState(false);

  useEffect(() => {
    // Solo verificamos si hay sesión para mostrar el botón correspondiente
    const data = localStorage.getItem('user_data');
    if (data) setUsuario(JSON.parse(data));
  }, []);

  const irALogin = () => navigate('/login');
  const irADashboard = () => navigate('/dashboard');

  return (
    <div className="App" style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#1a1a1a', overflow: 'hidden' }}>
       
       {/* === HEADER FLOTANTE === */}
       <div 
         style={{
            ...styles.headerPublico,
            opacity: mostrarMenu ? 1 : 0.9, 
            background: mostrarMenu ? 'rgba(0,0,0,0.95)' : 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
            transition: 'all 0.3s ease'
         }}
         onMouseEnter={() => setMostrarMenu(true)}
         onMouseLeave={() => setMostrarMenu(false)}
       >
           <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
               <img src="/DuocUC-1024x252.png" alt="Logo Duoc UC" style={{ height: '55px', filter: 'brightness(0) invert(1)' }} />
               <div style={{ width: '2px', height: '40px', background: '#FFB500', opacity: 0.7 }}></div>
               <div>
                   <div style={{ fontWeight:'bold', fontSize: '1.4rem', letterSpacing: '1px', color: '#fff', lineHeight: '1.2' }}>ESTACIONAMIENTOS</div>
                   <div style={{ fontSize: '0.9rem', color: '#FFB500', fontWeight: 'bold', letterSpacing: '2px' }}>DISPONIBILIDAD EN VIVO</div>
                   <div style={{ fontSize: '1.6rem', color: '#FFB500', fontWeight: 'bold', letterSpacing: '2px' }}>SEDE SAN BERNARDO</div>
               </div>
           </div>
           <div style={{ opacity: (mostrarMenu || usuario) ? 1 : 0, pointerEvents: (mostrarMenu || usuario) ? 'auto' : 'none', transition: 'opacity 0.3s ease' }}>
               {usuario ? (
                   <div style={{ display:'flex', gap:'15px', alignItems:'center' }}>
                       <span style={styles.badgeSesion}>Hola, {usuario.first_name || usuario.username}</span>
                       <button onClick={irADashboard} style={styles.btnLogin}>📂 PANEL</button>
                   </div>
               ) : (
                   <button onClick={irALogin} style={styles.btnLoginGhost}>🔐 ACCESO INTERNO</button>
               )}
           </div>
       </div>

       {/* === CONTENEDOR PRINCIPAL AL 100% === */}
       <div style={{ flex: 1, display: 'flex', position: 'relative', marginTop: '80px', justifyContent: 'center', alignItems: 'center' }}> 
           
           {/* MAPA A PANTALLA COMPLETA */}
            <div style={{ 
               width: '100%', 
               height: '100%', 
               display: 'flex', 
               justifyContent: 'center', 
               alignItems: 'center', 
               padding: '230px', // Quitamos el padding para ganar espacio
               boxSizing: 'border-box',
               transform: 'scale(1.4)', // 🔥 AQUÍ ESTÁ LA MAGIA (1.2 significa 20% más grande)
               transformOrigin: 'center center' // Para que crezca desde el centro
           }}>
               <Mapa token={null} /> 
           </div>

       </div>
    </div>
  );
};

// --- ESTILOS ---
const styles = {
    headerPublico: { 
        padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        zIndex: 100, position: 'absolute', top: 0, left: 0, width: '100%', boxSizing: 'border-box'
    },
    btnLogin: { 
        background: '#FFB500', color: '#002D5C', border: 'none', padding: '10px 25px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)' 
    },
    btnLoginGhost: { 
        background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.5)', color: 'white', padding: '8px 20px', borderRadius: '30px', cursor: 'pointer', fontSize: '12px', backdropFilter: 'blur(4px)'
    },
    badgeSesion: { 
        fontSize:'13px', background:'rgba(0, 45, 92, 0.8)', color:'#fff', padding:'8px 12px', borderRadius:'20px', fontWeight: '500', border: '1px solid #FFB500'
    }
};

export default Monitor;