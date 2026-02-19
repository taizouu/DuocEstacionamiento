import React from 'react';
// IMPORTAMOS EL MAPA DESDE LA RUTA CORRECTA (Subiendo 2 niveles)
import Mapa from '../../components/Mapa'; 

// Reutilizamos estilos base
import './PanelGuardia.css'; 

const PanelProfesor = ({ usuario }) => {
  // Nota: Ya no necesitamos recibir 'token' manual.

  return (
    <div className="guardia-dashboard">
      
      {/* BARRA SUPERIOR ACADÉMICA */}
      <div className="barra-accion" style={{ background: '#28a745', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🎓 PORTAL ACADÉMICO</span>
            <span style={{fontSize:'12px', background:'rgba(0,0,0,0.2)', padding:'4px 10px', borderRadius:'15px'}}>
                Bienvenido, {usuario ? usuario.first_name : 'Profesor'}
            </span>
        </div>
        
        <div style={{ fontSize: '12px', color: 'white', opacity: 0.9 }}>
            Vista de Disponibilidad en Tiempo Real
        </div>
      </div>

      {/* CONTENIDO: SOLO EL MAPA */}
      <div className="contenido-dinamico" style={{ padding: '0', height: 'calc(100vh - 110px)' }}>
           {/* El componente Mapa ya sabe usar api.js internamente */}
           <Mapa />
      </div>
    </div>
  );
};

export default PanelProfesor;