import React, { useState } from 'react';
import Mapa from './Mapa'; 
import Historial from './Historial';
import './PanelGuardia.css'; 

const PanelVisor = ({ token, rolUsuario }) => {
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
                background: rolUsuario.includes('Director') ? '#30a15f' : '#FFB500', // Rojo para Directores
                padding:'4px 10px', 
                borderRadius:'12px', 
                textTransform: 'uppercase',
                letterSpacing: '1px'
            }}>
                {rolUsuario}
            </span>
        </div>
        
        <div className="controles-vista">
            <button 
                className={`btn-toggle ${vista === 'mapa' ? 'activo' : ''}`} 
                onClick={() => setVista('mapa')}
            >
                MAPA EN VIVO
            </button>
            <button 
                className={`btn-toggle ${vista === 'historial' ? 'activo' : ''}`} 
                onClick={() => setVista('historial')}
            >
                REGISTROS Y AUDITORÍA
            </button>
        </div>
      </div>

      <div className="contenido-dinamico" style={{ padding: '0' }}>
        {vista === 'mapa' ? (
           <Mapa token={token} />
        ) : (
           <div className="contenedor-historial-full">
               <Historial token={token} />
           </div>
        )}
      </div>
    </div>
  );
};

export default PanelVisor;