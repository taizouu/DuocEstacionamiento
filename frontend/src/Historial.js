import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PanelGuardia.css'; // Importante: Aquí están los estilos

const Historial = ({ token }) => {
  const [registros, setRegistros] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  // --- LÓGICA DE DATOS (YA PROBADA) ---
  const obtenerHistorial = async () => {
    if (!token) return;
    
    try {
      // Indicador de carga sutil si es la primera vez
      if(registros.length === 0) setCargando(true);
      
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const url = `http://127.0.0.1:8000/api/historial/?search=${busqueda}&t=${Date.now()}`;
      
      const response = await axios.get(url, config);
      setRegistros(response.data);
      setError(null);
    } catch (err) {
      console.error("Error cargando historial:", err);
      if (err.response && err.response.status === 403) {
        setError("⛔ ACCESO DENEGADO: Permisos insuficientes.");
      } else {
        // Ignoramos errores menores de red para no molestar al usuario
      }
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => obtenerHistorial(), 500); // Debounce
    const intervalId = setInterval(() => obtenerHistorial(), 5000); // Polling

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busqueda, token]);

  // --- RENDERIZADO VISUAL (ESTILOS RESTAURADOS) ---
  return (
    <div style={{ padding: '20px', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. BARRA DE BÚSQUEDA ESTILIZADA */}
      <div style={{ 
          marginBottom: '20px', 
          display: 'flex', 
          gap: '10px',
          background: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
      }}>
        <div style={{ position: 'relative', flex: 1 }}>
            <span style={{ position: 'absolute', left: '10px', top: '10px', fontSize: '18px' }}>🔍</span>
            <input 
              type="text" 
              placeholder="Buscar por RUT, Nombre, Patente..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 10px 10px 40px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
        </div>
        <button 
            onClick={obtenerHistorial} 
            style={{
                background: '#002D5C', 
                color: 'white', 
                border: 'none', 
                padding: '0 20px', 
                borderRadius: '6px', 
                cursor: 'pointer',
                fontWeight: 'bold'
            }}
        >
            REFRESCAR
        </button>
      </div>

      {/* 2. MENSAJE DE ERROR */}
      {error && (
        <div style={{ padding: '15px', background: '#ffebee', color: '#c62828', borderRadius: '5px', marginBottom: '15px', border: '1px solid #ffcdd2', fontWeight: 'bold' }}>
            {error}
        </div>
      )}

      {/* 3. TABLA CON ESTILOS PROFESIONALES */}
      <div className="tabla-contenedor" style={{ flex: 1, overflow: 'auto', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <table className="tabla-historial" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
            <tr style={{ background: '#002D5C', color: 'white', textAlign: 'left' }}>
              <th style={{ padding: '15px' }}>FUNCIONARIO / VISITA</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>LUGAR</th>
              <th style={{ padding: '15px' }}>ENTRADA</th>
              <th style={{ padding: '15px' }}>SALIDA</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {registros.length > 0 ? (
              registros.map((r, index) => (
                <tr key={r.id} style={{ borderBottom: '1px solid #eee', background: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                  
                  {/* Funcionario */}
                  <td style={{ padding: '12px 15px', color: '#333' }}>
                      <div style={{ fontWeight: 'bold' }}>{r.funcionario.split('(')[0]}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>RUT: {r.funcionario.split('(')[1]?.replace(')', '') || '---'}</div>
                  </td>

                  {/* Lugar */}
                  <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                      <span style={{ 
                          background: '#e3f2fd', 
                          color: '#0d47a1', 
                          padding: '5px 10px', 
                          borderRadius: '4px', 
                          fontWeight: 'bold',
                          border: '1px solid #bbdefb'
                      }}>
                          {r.lugar}
                      </span>
                  </td>

                  {/* Fechas */}
                  <td style={{ padding: '12px 15px', color: '#555' }}>{r.entrada}</td>
                  <td style={{ padding: '12px 15px', color: '#555' }}>{r.salida}</td>

                  {/* Estado (Badge) */}
                  <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                    <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        background: r.estado === 'Activo' ? '#d4edda' : '#e2e3e5',
                        color: r.estado === 'Activo' ? '#155724' : '#383d41',
                        border: r.estado === 'Activo' ? '1px solid #c3e6cb' : '1px solid #d6d8db'
                    }}>
                      {r.estado === 'Activo' ? '🟢 EN SITIO' : '🔴 FINALIZADO'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                  {cargando ? (
                      <div>⏳ Cargando registros...</div>
                  ) : (
                      <div>
                          <div style={{fontSize: '30px', marginBottom: '10px'}}>📭</div>
                          No se encontraron movimientos.
                      </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Historial;