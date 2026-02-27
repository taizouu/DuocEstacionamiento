import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Mapa from '../../components/Mapa'; 
import '../../assets/App.css'; 

const Monitor = () => {
  const navigate = useNavigate(); 
  const [usuario, setUsuario] = useState(null);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  
  // ESTADOS PARA EL ESCALADO RESPONSIVO
  const [escala, setEscala] = useState(1);
  const monitorRef = useRef(null);

  useEffect(() => {
    const data = localStorage.getItem('user_data');
    if (data) setUsuario(JSON.parse(data));

    // LÓGICA DE ESCALADO PROPORCIONAL
    const handleResize = () => {
      if (monitorRef.current) {
        const anchoPantalla = window.innerWidth;
        // 1100 es aproximadamente el ancho total de tu mapa en píxeles
        const anchoMapaBase = 1100; 

        if (anchoPantalla < anchoMapaBase) {
          // Si la pantalla es más chica, calculamos cuánto encoger (dejando 20px de margen)
          const nuevaEscala = (anchoPantalla - 20) / anchoMapaBase;
          setEscala(nuevaEscala);
        } else {
          // En PC, tamaño real
          setEscala(1);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Ejecutar al cargar

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const irALogin = () => navigate('/login');
  const irADashboard = () => navigate('/dashboard');

  return (
    // CAMBIO 1: Fondo de la App a blanco
    <div className="App" ref={monitorRef} style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#ffffff', overflowX: 'hidden', overflowY: 'auto' }}>
       
       {/* CSS RESPONSIVO PARA EL HEADER INYECTADO */}
       <style>{`
          .header-monitor {
              padding: 15px 40px; display: flex; justify-content: space-between; align-items: center; 
              z-index: 100; position: absolute; top: 0; left: 0; width: 100%; box-sizing: border-box;
              /* CAMBIO 2: Fondo del header blanco sólido siempre */
              background: #000000;
          }
          .header-left { display: flex; align-items: center; gap: 20px; }
          /* CAMBIO 3: Quitar filtro del logo para que use sus colores originales sobre blanco */
          .logo-duoc { height: 55px; }
          .linea-separadora { width: 2px; height: 40px; background: #FFB500; opacity: 0.7; }
          /* CAMBIO 4: Cambiar color de texto ESTACIONAMIENTOS a azul oscuro */
          .txt-1 { font-weight:bold; font-size: 1.4rem; letter-spacing: 1px; color: #f2f3f3; line-height: 1.2; }
          /* CAMBIO 5: Revisar color de DISPONIBILIDAD EN VIVO - Se mantiene amarillo por contraste */
          .txt-2 { font-size: 0.9rem; color: #FFB500; font-weight: bold; letter-spacing: 2px; }
          /* CAMBIO 6: Revisar color de SEDE SAN BERNARDO - Se mantiene amarillo por contraste */
          .txt-3 { font-size: 1.6rem; color: #FFB500; font-weight: bold; letter-spacing: 2px; }

          /* En móviles ajustamos el header - Fondo blanco sólido */
          @media (max-width: 800px) {
              .header-monitor { padding: 15px 20px; flex-direction: column; align-items: flex-start; gap: 15px; background: #000000 !important; }
              .logo-duoc { height: 35px; color : #ffff; }
              .linea-separadora { height: 30px; }
              .txt-1 { font-size: 1rem; }
              .txt-2 { font-size: 0.7rem; }
              .txt-3 { font-size: 1.1rem; }
          }
       `}</style>

       {/* === HEADER FLOTANTE === */}
       <div 
         className="header-monitor"
         // CAMBIO 7: Quitar lógica de degradado y transparencia, solo un fondo sólido
         style={{
            opacity: mostrarMenu ? 1 : 0.9, 
            transition: 'all 0.3s ease'
         }}
         onMouseEnter={() => setMostrarMenu(true)}
         onMouseLeave={() => setMostrarMenu(false)}
       >
           <div className="header-left">
               <img src="/DuocUC-1024x252.png" alt="Logo Duoc UC" className="logo-duoc" />
               <div className="linea-separadora"></div>
               <div>
                   <div className="txt-1">ESTACIONAMIENTOS</div>
                   <div className="txt-2">DISPONIBILIDAD EN VIVO</div>
                   <div className="txt-3">SEDE SAN BERNARDO</div>
               </div>
           </div>
           <div style={{ opacity: (mostrarMenu || usuario) ? 1 : 0, transition: 'opacity 0.3s ease' }}>
               {usuario ? (
                   <div style={{ display:'flex', gap:'15px', alignItems:'center' }}>
                       <span style={styles.badgeSesion}>Hola, {usuario.first_name || usuario.username}</span>
                       <button onClick={irADashboard} style={styles.btnLogin}>PANEL</button>
                   </div>
               ) : (
                   <button onClick={irALogin} style={styles.btnLoginGhost}>🔐 ACCESO INTERNO</button>
               )}
           </div>
       </div>

       {/* === CONTENEDOR DEL MAPA (Con margen dinámico superior) === */}
       <div style={{ 
           flex: 1, 
           display: 'flex', 
           // CAMBIO 8: Bajar el mapa aumentando el marginTop (window.innerWidth < 800 ? '160px' : '130px')
           marginTop: window.innerWidth < 800 ? '160px' : '130px', 
           justifyContent: 'center', 
           alignItems: 'flex-start',
           paddingBottom: '40px'
       }}> 
           
           {/* ENVOLTORIO DE ESCALADO: Aquí aplicamos el Zoom Out */}
            <div style={{ 
               transform: `scale(${escala})`, 
               transformOrigin: 'top center', // Asegura que se encoja hacia el centro-arriba
               transition: 'transform 0.1s ease-out'
           }}>
               <Mapa token={null} /> 
           </div>

       </div>
    </div>
  );
};

// --- ESTILOS INLINE DE BOTONES ---
const styles = {
    btnLogin: { background: '#FFB500', color: '#002D5C', border: 'none', padding: '10px 25px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' },
    /* CAMBIO 9: Actualizar botón "ghost" para fondo blanco (border azul oscuro, color azul oscuro, transparent bg) */
    btnLoginGhost: { background: '#1b1a1a', border: '1px solid #e5e9ec', color: '#ececec', padding: '8px 20px', borderRadius: '30px', cursor: 'pointer', fontSize: '15px' },
    badgeSesion: { fontSize:'13px', background:'rgba(255, 255, 255, 0.8)', color:'#fff', padding:'8px 12px', borderRadius:'20px', fontWeight: '500', border: '1px solid #FFB500' }
};

export default Monitor;