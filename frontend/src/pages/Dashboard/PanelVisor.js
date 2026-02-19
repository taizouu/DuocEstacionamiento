import React, { useState } from 'react';

// 1. CORREGIMOS LAS RUTAS DE IMPORTACIÓN (Subiendo 2 niveles)
import Mapa from '../../components/Mapa'; 
import Historial from '../../components/Historial';

// Reutilizamos estilos
import './PanelGuardia.css'; 

const PanelVisor = ({ rolUsuario }) => {
  // Nota: Eliminamos la prop 'token', ya no se necesita aquí.
  const [vista, setVista] = useState('mapa');

  return (
    <div className="guardia-dashboard">
      
      {/* BARRA SUPERIOR (Solo Lectura) */}
      <div className="barra-accion" style={{ background: '#1817176b', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#002D5C', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
            src="DuocUC-1024x252.png" 
            alt="Logo Duoc" 
            style={{ height: '60px', marginBottom: '20px' }} 
            />
            <span>VISOR INSTITUCIONAL </span>
            {/* Etiqueta del cargo */}
            <span style={{
                fontSize:'11px', 
                background: rolUsuario.includes('Director') ? '#30a15f' : '#FFB500', 
                padding:'4px 10px', 
                borderRadius:'12px', 
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: 'white',
                fontWeight: 'bold'
            }}>
                {rolUsuario}
            </span>
        </div>
        
        <div className="controles-vista" style={{ display: 'flex', gap: '10px' }}>
            <button 
                className={`btn-toggle ${vista === 'mapa' ? 'activo' : ''}`} 
                onClick={() => setVista('mapa')}
                style={{
                    padding: '8px 15px', borderRadius: '20px', border: '1px solid white', 
                    background: vista === 'mapa' ? 'white' : 'transparent',
                    color: vista === 'mapa' ? '#002D5C' : 'white',
                    fontWeight: 'bold', cursor: 'pointer'
                }}
            >
                MAPA EN VIVO
            </button>
            <button 
                className={`btn-toggle ${vista === 'historial' ? 'activo' : ''}`} 
                onClick={() => setVista('historial')}
                style={{
                    padding: '8px 15px', borderRadius: '20px', border: '1px solid white', 
                    background: vista === 'historial' ? 'white' : 'transparent',
                    color: vista === 'historial' ? '#002D5C' : 'white',
                    fontWeight: 'bold', cursor: 'pointer'
                }}
            >
                REGISTROS Y AUDITORÍA
            </button>
        </div>
      </div>

      <div className="contenido-dinamico" style={{ padding: '0', flex: 1 }}>
        {vista === 'mapa' ? (
           // ✅ Componente Mapa limpio (ya sabe usar api.js)
           <Mapa />
        ) : (
           <div className="contenedor-historial-full" style={{ height: '100%' }}>
               {/* ✅ Componente Historial limpio */}
               <Historial />
           </div>
        )}
      </div>
    </div>
  );
};

export default PanelVisor;