import React, { useState, useEffect, useRef, useCallback } from 'react';
import api from '../../services/api'; 
import Mapa from '../../components/Mapa'; 
import Historial from '../../components/Historial'; 

import './PanelGuardia.css';

const PanelGuardia = () => { 

  // ESTADOS VISTA
  const [vista, setVista] = useState('mapa'); 

  // ESTADOS PISTOLEO
  const [mensaje, setMensaje] = useState(null); 
  const [datosMapa, setDatosMapa] = useState(null);
  const [triggerGeneral, setTriggerGeneral] = useState(0); 
  const [bloqueoFoco, setBloqueoFoco] = useState(false);

  // Estados del Flujo Normal
  const [paso, setPaso] = useState(1); 
  const [rutTemporal, setRutTemporal] = useState(''); 
  const [inputValue, setInputValue] = useState('');
  const [procesando, setProcesando] = useState(false);
  
  // --- ESTADOS DEL MODAL DE VISITA ---
  const [modalVisita, setModalVisita] = useState(false);
  const [lugarPendiente, setLugarPendiente] = useState(null);
  const [nombreVisita, setNombreVisita] = useState('');
  const [patenteVisita, setPatenteVisita] = useState(''); 
  const [zonaVisita, setZonaVisita] = useState(''); 

  // --- NUEVO: ESTADO PARA LOS ÚLTIMOS 5 REGISTROS ---
  const [ultimosRegistros, setUltimosRegistros] = useState([]);

  const inputRef = useRef(null);
  const inputNombreRef = useRef(null); 

  // --- FUNCIÓN PARA CARGAR LOS 5 REGISTROS ---
  const cargarUltimosRegistros = useCallback(async () => {
      try {
          const res = await api.get('/api/historial/');
          setUltimosRegistros(res.data.slice(0, 5)); // Solo guardamos los 5 más recientes
      } catch (error) {
          console.error("Error al cargar últimos registros:", error);
      }
  }, []);

  // --- EFECTO DE POLLING (Refresco cada 5 seg) ---
  useEffect(() => {
      cargarUltimosRegistros();
      const intervalo = setInterval(cargarUltimosRegistros, 5000);
      return () => clearInterval(intervalo);
  }, [cargarUltimosRegistros]);


  // --- FOCO AUTOMÁTICO ---
  useEffect(() => {
    if (vista !== 'mapa') return;

    const enfocar = () => { 
        if (!bloqueoFoco && !modalVisita) inputRef.current?.focus(); 
        if (modalVisita) setTimeout(() => inputNombreRef.current?.focus(), 100);
    };
    enfocar();
    if (!bloqueoFoco && !modalVisita) window.addEventListener('click', enfocar);
    return () => window.removeEventListener('click', enfocar);
  }, [bloqueoFoco, mensaje, paso, modalVisita, vista]);

  // --- FUNCIÓN DE ENVÍO ---
  const enviarAlServidor = async (rut, id_lugar, datosVisita = null) => {
      setProcesando(true);
      try {
        const rutLimpio = rut ? rut.replace(/[^0-9kK]/g, '').toUpperCase() : null;
        const payload = { rut: rutLimpio, id_lugar: id_lugar };

        if (datosVisita) {
            payload.nombre_visita = datosVisita.nombre;
            payload.patente = datosVisita.patente; 
            payload.zona = datosVisita.zona; 
        }

        const response = await api.post('/api/pistoleo/', payload);
        const datos = response.data;
        
        let tipoMensaje = datos.tipo === 'entrada' ? 'exito-entrada' : 'exito-salida';
        
        setMensaje({
            tipo: tipoMensaje, 
            texto: datos.mensaje || "Operación Exitosa",
            detalle: datos.datos ? `LUGAR: ${datos.datos.lugar}` : (datos.lugar ? `Lugar: ${datos.lugar}` : 'Procesado')
        });

        if(datos.datos) setDatosMapa(datos.datos);
        
        // Disparamos actualizaciones
        setTriggerGeneral(prev => prev + 1); 
        cargarUltimosRegistros(); // <-- NUEVO: Actualiza la tabla lateral instantáneamente al pistolear
        
        setPaso(1); setRutTemporal(''); setModalVisita(false); 
        setNombreVisita(''); setPatenteVisita(''); setZonaVisita(''); setLugarPendiente(null);

      } catch (error) {
        const errorData = error.response?.data;
        if (error.response?.status === 404 && errorData?.codigo === 'RUT_NO_ENCONTRADO') {
            setLugarPendiente(id_lugar); 
            setModalVisita(true); 
            setMensaje(null); 
        } else {
            setMensaje({ tipo: 'error', texto: "ERROR", detalle: errorData?.error || "Error de conexión" });
            ///if (paso === 2) { setPaso(1); setRutTemporal(''); }
        }
      }
      setInputValue('');
      setProcesando(false);
      if (!modalVisita && !datosVisita) setTimeout(() => inputRef.current?.focus(), 100);
  };

  const confirmarVisita = () => {
      if (!nombreVisita.trim()) return alert("Debe ingresar el nombre");
      enviarAlServidor(rutTemporal, lugarPendiente, {
          nombre: nombreVisita, patente: patenteVisita, zona: zonaVisita
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!inputValue) return;
      const valorRaw = inputValue.trim().toUpperCase(); 
      
      if (paso === 1) {
          const esLugar = valorRaw.startsWith("E.") || valorRaw.length <= 4;
          if (esLugar) enviarAlServidor(null, valorRaw); 
          else { 
              const rutLimpio = valorRaw.replace(/[^0-9kK]/g, '');
              setRutTemporal(rutLimpio); setInputValue(''); setPaso(2); 
              setMensaje({ tipo: 'info', texto: 'RUT LEÍDO', detalle: 'Ahora escanee el LUGAR' }); 
          }
      } else if (paso === 2) enviarAlServidor(rutTemporal, valorRaw); 
    }
  };

  const cancelarCiclo = () => {
      setPaso(1); setRutTemporal(''); setInputValue(''); setMensaje(null); inputRef.current?.focus();
  };

  useEffect(() => {
      if (mensaje && mensaje.tipo !== 'info') {
          const timer = setTimeout(() => setMensaje(null), 4000);
          return () => clearTimeout(timer);
      }
  }, [mensaje]);

  // Auxiliar para extraer solo la hora de la cadena "18/02 12:15"
  const extraerHora = (fechaStr) => {
      if (!fechaStr || fechaStr === "En curso") return "--:--";
      return fechaStr.split(' ')[1] || fechaStr;
  };

  return (
    <div className="guardia-dashboard" style={{ background: '#f4f6f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* BARRA SUPERIOR (ESCÁNER Y NOTIFICACIONES) */}
      <div className={`barra-accion ${mensaje ? mensaje.tipo : ''}`} style={{ margin: '10px 20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        
        <div className="input-zona">
            <img src="/DuocUC-1024x252.png" alt="Logo Duoc" style={{ height: '40px', marginRight: '20px' }} />
          
          {vista === 'mapa' && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', marginRight: '15px' }}>
                  <span style={{ color: paso === 2 ? '#FFB500' : 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    {paso === 1 ? "ESCANEAR:" : "ASIGNAR A:"}
                  </span>
                  {paso === 2 && <span style={{fontSize: '0.8rem', color: '#ccc'}}>RUT: {rutTemporal}</span>}
              </div>
              
              <input 
                ref={inputRef}
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.replace(/[^0-9A-Za-zkK.-]/g, '').toUpperCase())}
                onKeyDown={handleKeyDown}
                placeholder={bloqueoFoco ? "Pausado..." : (paso === 1 ? "Esperando RUT o LUGAR..." : "Esperando QR Lugar...")}
                disabled={procesando || bloqueoFoco || modalVisita}
                autoComplete="off"
                style={{ 
                    border: paso === 2 ? '3px solid #FFB500' : 'none', 
                    backgroundColor: paso === 2 ? '#fff8e1' : 'rgba(255,255,255,0.9)',
                    textTransform: 'uppercase', width: '300px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', color: '#000',
                    padding: '10px', borderRadius: '4px'
                }}
              />
              
              {paso === 2 && (
                  <button onClick={cancelarCiclo} style={{ marginLeft: '15px', background: '#dc3545', color: 'white', border: '2px solid white', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>CANCELAR</button>
              )}
            </>
          )}
        </div>

        {mensaje && (
          <div className="notificacion-flotante" style={{ marginLeft: 'auto', paddingRight: '20px' }}>
            <span className="titulo-notif" style={{ display: 'block', fontWeight: 'bold', fontSize: '1.2rem' }}>{mensaje.texto}</span>
            <span className="detalle-notif" style={{ fontSize: '1rem' }}> {mensaje.detalle}</span>
          </div>
        )}

        <div className="controles-vista" style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
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
                MAPA OPERATIVO
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
                HISTORIAL
            </button>
        </div>
      </div>

      {/* CONTENIDO DINÁMICO */}
      <div className="contenido-dinamico" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
         {vista === 'mapa' ? (
             
             // --- NUEVA ESTRUCTURA DIVIDIDA RESPONSIVA PARA EL GUARDIA ---
             <div className="contenedor-dividido" style={{ display: 'flex', flex: 1, gap: '15px', padding: '0 20px 20px 20px' }}>
                
                {/* ZONA DEL MAPA */}
                <div className="seccion-mapa" style={{ flex: '0 0 72%', background: 'white', borderRadius: '8px', padding: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <Mapa 
                        datosIngreso={datosMapa} 
                        recargar={triggerGeneral} 
                        alCambiarModal={setBloqueoFoco} 
                    />
                </div>

                {/* ZONA DE ÚLTIMOS REGISTROS (MINI TABLA) */}
                <div className="seccion-tabla" style={{ flex: 1, background: 'white', borderRadius: '8px', padding: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ marginTop: 0, color: '#002D5C', borderBottom: '2px solid #FFB500', paddingBottom: '10px', fontSize: '1.1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Últimos Movimientos</span>
                        <span style={{ fontSize: '0.8rem', background: '#e3f2fd', color: '#0d47a1', padding: '2px 6px', borderRadius: '10px' }}>En vivo</span>
                    </h3>
                    
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                            <thead>
                                <tr style={{ color: '#666', textAlign: 'center', borderBottom: '1px solid #eee' }}>
                                    <th style={{ padding: '8px 4px' }}>Hora</th>
                                    <th style={{ padding: '8px 4px' }}>Lugar</th>
                                    <th style={{ padding: '8px 4px' }}>Patente</th>
                                    <th style={{ padding: '8px 4px', textAlign: 'center' }}>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ultimosRegistros.length === 0 ? (
                                    <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#aaa' }}>Sin registros recientes</td></tr>
                                ) : (
                                    ultimosRegistros.map(mov => (
                                        <tr key={mov.id} style={{ borderBottom: '1px solid #f8f9fa' }}>
                                            <td style={{ padding: '10px 4px', fontWeight: 'bold', color: '#333' }}>
                                                {mov.estado === 'Activo' ? extraerHora(mov.ingreso) : extraerHora(mov.salida)}
                                            </td>
                                            <td style={{ padding: '10px 4px', color: '#002D5C', fontWeight: 'bold' }}>{mov.lugar}</td>
                                            <td style={{ padding: '10px 4px', color: '#666' }}>{mov.patente || '---'}</td>
                                            <td style={{ padding: '10px 4px', textAlign: 'center' }}>
                                                {mov.estado === 'Activo' ? (
                                                    <span style={estiloTagIngresoGuardia}>ENTRA</span>
                                                ) : (
                                                    <span style={estiloTagSalidaGuardia}>SALE</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Botón rápido para ir al historial completo */}
                    <button onClick={() => setVista('historial')} style={{ marginTop: '10px', padding: '8px', background: '#f8f9fa', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', color: '#002D5C', fontWeight: 'bold', fontSize: '11px', width: '100%' }}>
                        VER HISTORIAL COMPLETO
                    </button>
                </div>
             </div>

         ) : (
             <Historial token={null} /> 
         )}
      </div>

      {/* --- MODAL VISITA --- */}
      {modalVisita && (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.85)', zIndex: 5000,
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
            <div style={{ 
                background: 'white', padding: '30px', borderRadius: '15px', 
                width: '400px', textAlign: 'center', borderTop: '6px solid #FFB500',
                boxShadow: '0 0 30px rgba(255, 181, 0, 0.3)'
            }}>
                <h2 style={{color: '#002D5C', marginTop: 0, fontSize: '1.4rem'}}>👤 NUEVA VISITA</h2>
                <p style={{fontSize: '13px', color: '#666', marginBottom: '15px'}}>
                    RUT: <strong>{rutTemporal}</strong> - Asignando a: <strong>{lugarPendiente}</strong>
                </p>
                <input ref={inputNombreRef} type="text" placeholder="Nombre Completo *" value={nombreVisita} onChange={(e) => setNombreVisita(e.target.value)} style={estiloInputModal} maxLength={30} />
                <input type="text" placeholder="Patente" value={patenteVisita} onChange={(e) => setPatenteVisita(e.target.value.toUpperCase())} style={estiloInputModal} maxLength={6} />
                <input type="text" placeholder="Dirección / Destino" value={zonaVisita} onChange={(e) => setZonaVisita(e.target.value)} style={estiloInputModal} maxLength={20} />

                <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                    <button onClick={() => { setModalVisita(false); cancelarCiclo(); }} style={{flex: 1, padding: '12px', background: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', color: '#333'}}>CANCELAR</button>
                    <button onClick={confirmarVisita} style={{flex: 1, padding: '12px', background: '#002D5C', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', color: 'white'}}>REGISTRAR</button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

const estiloInputModal = { width: '100%', padding: '10px', fontSize: '15px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', boxSizing: 'border-box' };

const estiloTagIngresoGuardia = {
    background: '#d4edda', color: '#155724', padding: '3px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', border: '1px solid #c3e6cb'
};

const estiloTagSalidaGuardia = {
    background: '#f8d7da', color: '#721c24', padding: '3px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', border: '1px solid #f5c6cb'
};

export default PanelGuardia;