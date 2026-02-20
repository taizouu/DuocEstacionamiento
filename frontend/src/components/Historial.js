import React, { useState, useEffect, useCallback } from 'react';
// 1. IMPORTAMOS LA API CENTRALIZADA (Ruta correcta: subimos 2 niveles)
import api from '../services/api'; 
import './Historial.css'; 

const Historial = () => {
  // Nota: Eliminamos la prop ({ token }) porque api.js ya maneja la auth.

  const [registros, setRegistros] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: '' });

  const obtenerHistorial = useCallback(async () => {
    try {
      if(registros.length === 0) setCargando(true);
      
      const response = await api.get(`/api/historial/?search=${busqueda}&t=${Date.now()}`);
      
      setRegistros(response.data);
      setError(null);
    } catch (err) {
      console.error("Error historial:", err);
      if (err.response && err.response.status === 403) {
        setError("⛔ ACCESO DENEGADO");
      } else {
      }
    } finally {
      setCargando(false);
    }
  }, [busqueda, registros.length]);

  useEffect(() => {
    const timeoutId = setTimeout(() => obtenerHistorial(), 500);
    // Refresco automático cada 5 segundos
    const intervalId = setInterval(() => obtenerHistorial(), 5000);
    
    return () => { clearTimeout(timeoutId); clearInterval(intervalId); };
  }, [obtenerHistorial]);

  // --- RENDERIZADO VISUAL ---
  return (
    <div style={{ padding: '20px', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      
      {/* TOOLTIP FLOTANTE */}
      {tooltip.visible && (
        <div style={{
            position: 'fixed',
            top: tooltip.y + 15,
            left: tooltip.x + 15,
            zIndex: 9999,
            background: 'rgba(0, 45, 92, 0.95)', // Azul Corporativo
            color: 'white',
            padding: '10px 15px',
            borderRadius: '6px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            fontSize: '12px',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
        }}>
            <div style={{ color: '#FFB500', fontWeight: 'bold', marginBottom: '3px', textTransform: 'uppercase' }}>
                LIBERACIÓN MANUAL
            </div>
            <div>
                Responsable: <strong>{tooltip.text}</strong>
            </div>
        </div>
      )}

      {/* BARRA DE BÚSQUEDA */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <input 
          type="text" 
          placeholder="Buscar por nombre, patente o cargo..." 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <button onClick={obtenerHistorial} style={{ background: '#002D5C', color: 'white', border: 'none', padding: '0 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            REFRESCAR
        </button>
      </div>

      {error && <div style={{ padding: '15px', background: '#ffebee', color: '#c62828', marginBottom: '15px', borderRadius: '4px' }}>{error}</div>}

      {/* TABLA */}
      <div className="tabla-contenedor" style={{ flex: 1, overflow: 'auto', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <table className="tabla-historial" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
            <tr style={{ background: '#002D5C', color: 'white', textAlign: 'center' }}>
              <th style={{ padding: '15px' }}>USUARIO</th>
              <th style={{ padding: '15px' }}>CARGO</th>
              <th style={{ padding: '15px' }}>PATENTE</th>
              <th style={{ padding: '15px' }}>DESTINO</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>LUGAR</th>
              <th style={{ padding: '15px' }}>HORARIO</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {registros.length === 0 && !cargando && (
                <tr>
                    <td colSpan="7" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>No se encontraron registros recientes.</td>
                </tr>
            )}
            {registros.map((r, index) => (
                <tr key={r.id} style={{ borderBottom: '1px solid #eee', background: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                  <td style={{ padding: '12px 15px' }}>
                      <strong>{r.nombre}</strong><br/><span style={{fontSize:'11px', color:'#666'}}>{r.rut}</span>
                  </td>
                  <td style={{ padding: '12px 15px' }}>{r.cargo}</td>
                  <td style={{ padding: '12px 15px', fontWeight: 'bold', color:'#002D5C' }}>{r.patente || '---'}</td>
                  <td style={{ padding: '12px 15px' }}>{r.destino || '---'}</td>
                  <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                      <span style={{ background:'#e3f2fd', color:'#0d47a1', padding:'5px 10px', borderRadius:'4px', fontWeight:'bold' }}>{r.lugar}</span>
                  </td>
                  
                  {/* === ZONA DE EVENTOS DEL MOUSE (TOOLTIP) === */}
                  <td style={{ padding: '12px 15px' }}>
                      {r.estado === 'Activo' ? '---' : (
                          <div>
                              <div>{r.ingreso}</div>
                              <div>{r.salida}</div>
                              <div style={{ marginTop: '5px' }}>
                                  {r.tipo_salida === 'MANUAL' ? (
                                      <span 
                                        style={{ 
                                            background: '#ffebee', color: '#c62828', border: '1px solid #ffcdd2',
                                            padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold',
                                            display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'help'
                                        }}
                                        // EVENTOS DEL TOOLTIP
                                        onMouseEnter={(e) => setTooltip({ 
                                            visible: true, 
                                            x: e.clientX, 
                                            y: e.clientY, 
                                            text: r.liberado_por || 'Admin Desconocido' 
                                        })}
                                        onMouseMove={(e) => setTooltip(prev => ({ 
                                            ...prev, 
                                            x: e.clientX, 
                                            y: e.clientY 
                                        }))}
                                        onMouseLeave={() => setTooltip({ visible: false, x: 0, y: 0, text: '' })}
                                      >
                                          ⚠️ MANUAL
                                      </span>
                                  ) : (
                                      <span style={{ color: '#aaa', fontSize: '10px', fontStyle: 'italic' }}>📱 Escáner</span>
                                  )}
                              </div>
                          </div>
                      )}
                  </td>

                  <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                    <span style={{
                        padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold',
                        background: r.estado === 'Activo' ? '#d4edda' : '#f8d7da',
                        color: r.estado === 'Activo' ? '#155724' : '#721c24'
                    }}>
                      {r.estado === 'Activo' ? 'EN SITIO' : 'FINALIZADO'}
                    </span>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Historial;