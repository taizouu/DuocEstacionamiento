import React, { useState, useEffect, useRef } from 'react';
import mapaService from './services/mapaService'; // <--- Importamos el servicio
import Mapa from './Mapa'; 
import './PanelGuardia.css';

const PanelGuardia = ({ token }) => {
  const [mensaje, setMensaje] = useState(null); 
  const [datosMapa, setDatosMapa] = useState(null);
  const [triggerGeneral, setTriggerGeneral] = useState(0); 
  const [bloqueoFoco, setBloqueoFoco] = useState(false);

  // Estados del Flujo Normal
  const [paso, setPaso] = useState(1); 
  const [rutTemporal, setRutTemporal] = useState(''); 
  const [inputValue, setInputValue] = useState('');
  const [procesando, setProcesando] = useState(false);
  
  // Modal de Visita
  const [modalVisita, setModalVisita] = useState(false);
  const [nombreVisita, setNombreVisita] = useState('');
  const [lugarPendiente, setLugarPendiente] = useState(null);

  const inputRef = useRef(null);
  const inputNombreRef = useRef(null);

  // --- 1. MANEJO DE FOCO (UX) ---
  useEffect(() => {
    const enfocar = () => { 
        if (!bloqueoFoco && !modalVisita) inputRef.current?.focus(); 
        if (modalVisita) setTimeout(() => inputNombreRef.current?.focus(), 100);
    };
    enfocar();
    if (!bloqueoFoco && !modalVisita) window.addEventListener('click', enfocar);
    return () => window.removeEventListener('click', enfocar);
  }, [bloqueoFoco, mensaje, paso, modalVisita]);


  // --- 2. LÓGICA DE NEGOCIO (REFACTORIZADA) ---
  const enviarAlServidor = async (rut, id_lugar, nombreVisitaOpcional = null) => {
      setProcesando(true);
      
      try {
        // Limpiamos el RUT
        const rutLimpio = rut ? rut.replace(/[^0-9kK]/g, '').toUpperCase() : null;

        // LLAMADA AL SERVICIO (Aquí está el cambio magico ✨)
        // Ya no configuramos headers ni axios manualmente.
        const datos = await mapaService.registrarPistoleo(rutLimpio, id_lugar, nombreVisitaOpcional);
        
        // --- MANEJO DE ÉXITO ---
        let tipoMensaje = 'exito';
        if (datos.tipo === 'entrada') tipoMensaje = 'exito-entrada';
        if (datos.tipo === 'salida') tipoMensaje = 'exito-salida';
        
        setMensaje({
            tipo: tipoMensaje, 
            texto: datos.mensaje || "Operación Exitosa",
            detalle: datos.datos ? `LUGAR: ${datos.datos.lugar}` : (datos.lugar ? `Lugar: ${datos.lugar}` : 'Procesado')
        });

        if(datos.datos) setDatosMapa(datos.datos);
        setTriggerGeneral(prev => prev + 1); // Recargar mapa
        
        // Reset del flujo
        setPaso(1);
        setRutTemporal('');
        setModalVisita(false);
        setNombreVisita('');
        setLugarPendiente(null);

      } catch (error) {
        // --- MANEJO DE ERRORES ---
        const errorData = error.response?.data;
        
        // Caso Especial: RUT no encontrado -> Abrir Modal Visita
        if (error.response?.status === 404 && errorData?.codigo === 'RUT_NO_ENCONTRADO') {
            setLugarPendiente(id_lugar); 
            setModalVisita(true); 
            setMensaje(null); 
        } else {
            // Error General
            const textoError = errorData?.error || "Error de conexión";
            setMensaje({ tipo: 'error', texto: "ERROR", detalle: textoError });
            if (paso === 2) { setPaso(1); setRutTemporal(''); }
        }
      } finally {
          setInputValue('');
          setProcesando(false);
          // Re-enfocar input principal si corresponde
          if (!modalVisita && !nombreVisitaOpcional) {
              setTimeout(() => inputRef.current?.focus(), 100);
          }
      }
  };

  const confirmarVisita = () => {
      if (!nombreVisita.trim()) return alert("Debe ingresar un nombre");
      enviarAlServidor(rutTemporal, lugarPendiente, nombreVisita);
  };

  // --- 3. MANEJADORES DE INPUT ---
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!inputValue) return;
      const valorRaw = inputValue.trim().toUpperCase(); 
      
      if (paso === 1) {
          const esLugar = valorRaw.startsWith("E.") || valorRaw.length <= 4;
          if (esLugar) { 
              enviarAlServidor(null, valorRaw); 
          } else { 
              const rutLimpio = valorRaw.replace(/[^0-9kK]/g, '');
              setRutTemporal(rutLimpio); 
              setInputValue(''); 
              setPaso(2); 
              setMensaje({ tipo: 'info', texto: 'RUT LEÍDO', detalle: 'Ahora escanee el LUGAR' }); 
          }
      } else if (paso === 2) { 
          enviarAlServidor(rutTemporal, valorRaw); 
      }
    }
  };

  const cancelarCiclo = () => {
      setPaso(1); setRutTemporal(''); setInputValue(''); setMensaje(null); inputRef.current?.focus();
  };

  // Auto-cierre de mensajes
  useEffect(() => {
      if (mensaje && mensaje.tipo !== 'info') {
          const timer = setTimeout(() => setMensaje(null), 4000);
          return () => clearTimeout(timer);
      }
  }, [mensaje]);

  // --- 4. RENDERIZADO (IGUAL QUE ANTES, PERO MÁS LIMPIO) ---
  return (
    <div className="guardia-dashboard">
      <div className={`barra-accion ${mensaje ? mensaje.tipo : ''}`}>
        
        <div className="input-zona">
          <img src="DuocUC-1024x252.png" alt="Logo Duoc" style={{ height: '60px', marginBottom: '20px' }} />
          
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
            onBlur={() => { if (!bloqueoFoco && !modalVisita) setTimeout(() => inputRef.current?.focus(), 10); }}
            placeholder={bloqueoFoco ? "Pausado..." : (paso === 1 ? "Esperando RUT o LUGAR..." : "Esperando QR Lugar...")}
            disabled={procesando || bloqueoFoco || modalVisita}
            autoComplete="off"
            style={{ 
                border: paso === 2 ? '3px solid #FFB500' : 'none', 
                backgroundColor: paso === 2 ? '#fff8e1' : 'rgba(255,255,255,0.9)',
                textTransform: 'uppercase', width: '300px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', color: '#000'
            }}
          />
          
          {paso === 2 && (
              <button onClick={cancelarCiclo} style={{ marginLeft: '15px', background: '#dc3545', color: 'white', border: '2px solid white', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>CANCELAR</button>
          )}
        </div>

        {mensaje && (
          <div className="notificacion-flotante" style={{ marginLeft: 'auto', paddingRight: '20px' }}>
            <span className="titulo-notif" style={{ display: 'block', fontWeight: 'bold', fontSize: '1.2rem' }}>{mensaje.texto}</span>
            <span className="detalle-notif" style={{ fontSize: '1rem' }}> {mensaje.detalle}</span>
          </div>
        )}

        <div className="controles-vista">
            <span style={{fontSize: '12px', opacity: 0.7, color: 'white'}}>MODO OPERATIVO</span>
        </div>
      </div>

      <div className="contenido-dinamico">
         <Mapa datosIngreso={datosMapa} recargar={triggerGeneral} token={token} alCambiarModal={setBloqueoFoco} />
      </div>

      {/* --- MODAL PARA REGISTRAR VISITA --- */}
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
                <h2 style={{color: '#002D5C', marginTop: 0}}>👤 NUEVA VISITA DETECTADA</h2>
                <p style={{fontSize: '14px', color: '#666', marginBottom: '20px'}}>
                    El RUT <strong>{rutTemporal}</strong> no está registrado.
                    <br/>Ingrese el nombre para autorizar el ingreso al lugar <strong>{lugarPendiente}</strong>.
                </p>
                
                <input 
                    ref={inputNombreRef}
                    type="text"
                    placeholder="Nombre y Apellido de la Visita"
                    value={nombreVisita}
                    onChange={(e) => setNombreVisita(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && confirmarVisita()}
                    style={{
                        width: '100%', padding: '12px', fontSize: '16px',
                        border: '2px solid #ccc', borderRadius: '5px', marginBottom: '20px',
                        boxSizing: 'border-box'
                    }}
                />

                <div style={{display: 'flex', gap: '10px'}}>
                    <button 
                        onClick={() => { setModalVisita(false); cancelarCiclo(); }}
                        style={{flex: 1, padding: '12px', background: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', color: '#333'}}
                    >
                        CANCELAR
                    </button>
                    <button 
                        onClick={confirmarVisita}
                        style={{flex: 1, padding: '12px', background: '#002D5C', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', color: 'white'}}
                    >
                        REGISTRAR Y INGRESAR
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default PanelGuardia;