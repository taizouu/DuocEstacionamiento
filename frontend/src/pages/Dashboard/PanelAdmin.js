import React, { useState, useEffect, useRef } from 'react';
// 1. IMPORTAMOS NUESTRA INSTANCIA DE API (Ya tiene el token configurado)
import api from '../../services/api'; 

// 2. IMPORTAMOS COMPONENTES DESDE SU NUEVA UBICACIÓN
import Mapa from '../../components/Mapa'; 
import Historial from '../../components/Historial'; 

// 3. ESTILOS
import './PanelGuardia.css'; 

const PanelAdmin = ({ rolUsuario }) => { 
  // Nota: Ya no necesitamos recibir 'token' como prop, api.js lo saca del localStorage

  // ==========================================
  // 1. ESTADOS GENERALES
  // ==========================================
  const [vista, setVista] = useState('mapa'); 
  const [usuarios, setUsuarios] = useState([]);
  
  // ==========================================
  // 2. ESTADOS DEL ESCÁNER
  // ==========================================
  const [mensaje, setMensaje] = useState(null); 
  const [triggerGeneral, setTriggerGeneral] = useState(0); 
  const [bloqueoFoco, setBloqueoFoco] = useState(false);
  const [paso, setPaso] = useState(1); 
  const [rutTemporal, setRutTemporal] = useState(''); 
  const [inputValue, setInputValue] = useState('');
  const [procesando, setProcesando] = useState(false);
  const [datosMapa, setDatosMapa] = useState(null);

  // ==========================================
  // 3. ESTADOS DE MODALES
  // ==========================================
  const [mostrarConfig, setMostrarConfig] = useState(false);
  const [mostrarMover, setMostrarMover] = useState(false);
  const [modalVisita, setModalVisita] = useState(false);
  const [lugarPendiente, setLugarPendiente] = useState(null);
  
  // Datos Visita
  const [nombreVisita, setNombreVisita] = useState('');
  const [patenteVisita, setPatenteVisita] = useState('');
  const [zonaVisita, setZonaVisita] = useState('');

  // CRUD Usuario
  const [nuevoUser, setNuevoUser] = useState({ 
      username: '', password: '', first_name: '', last_name: '', rol: 'Guardia' 
  });

  // Refs
  const inputRef = useRef(null);
  const inputNombreRef = useRef(null);

  // ==========================================
  // 4. EFECTOS
  // ==========================================
  useEffect(() => {
    if (vista === 'usuarios') cargarUsuarios();
  }, [vista]);

  useEffect(() => {
    if (vista !== 'mapa') return;
    
    const enfocar = () => { 
        if (!bloqueoFoco && !modalVisita && !mostrarConfig && !mostrarMover) {
            inputRef.current?.focus(); 
        }
        if (modalVisita) setTimeout(() => inputNombreRef.current?.focus(), 100);
    };
    
    enfocar();
    if (!bloqueoFoco && !modalVisita && !mostrarConfig && !mostrarMover) {
        window.addEventListener('click', enfocar);
    }
    return () => window.removeEventListener('click', enfocar);
  }, [bloqueoFoco, mensaje, paso, modalVisita, vista, mostrarConfig, mostrarMover]);

  useEffect(() => {
      if (mensaje && mensaje.tipo !== 'info') {
          const timer = setTimeout(() => setMensaje(null), 4000);
          return () => clearTimeout(timer);
      }
  }, [mensaje]);

  // ==========================================
  // 5. LÓGICA DE NEGOCIO (USANDO api.js)
  // ==========================================

  // --- A. GESTIÓN DE USUARIOS ---
  const cargarUsuarios = async () => {
    try {
      // ✅ CORRECCIÓN: Usamos la nueva ruta /admin/usuarios/
      const res = await api.get('/admin/usuarios/');
      setUsuarios(res.data);
    } catch (e) { console.error("Error usuarios", e); }
  };

  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    try {
      // ✅ CORRECCIÓN: Usamos la nueva ruta /admin/usuarios/
      await api.post('/admin/usuarios/', nuevoUser);
      alert(`Usuario ${nuevoUser.username} creado con éxito`);
      setNuevoUser({ username: '', password: '', first_name: '', last_name: '', rol: 'Guardia' });
      cargarUsuarios(); 
    } catch (err) { alert(err.response?.data?.error || "Error al crear"); }
  };

  const handleEliminar = async (id, nombre) => {
      if(!window.confirm(`¿Estás seguro de eliminar a ${nombre}?`)) return;
      try {
        // ✅ CORRECCIÓN: Usamos la nueva ruta /admin/usuarios/
        await api.delete('/admin/usuarios/', { params: { id: id } });
        cargarUsuarios(); 
      } catch (err) { alert(err.response?.data?.error || "Error al eliminar"); }
  };

  // --- B. SISTEMA DE ESCÁNER ---
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

        const response = await api.post('/pistoleo/', payload);
        const datos = response.data;
        
        let tipoMensaje = datos.tipo === 'entrada' ? 'exito-entrada' : 'exito-salida';
        
        setMensaje({
            tipo: tipoMensaje, 
            texto: datos.mensaje || "Operación Exitosa",
            detalle: datos.datos ? `LUGAR: ${datos.datos.lugar}` : (datos.lugar ? `Lugar: ${datos.lugar}` : 'Procesado')
        });

        if(datos.datos) setDatosMapa(datos.datos);
        setTriggerGeneral(prev => prev + 1); 
        
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
            if (paso === 2) { setPaso(1); setRutTemporal(''); }
        }
      }
      setInputValue('');
      setProcesando(false);
      if (!modalVisita && !datosVisita) setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!inputValue) return;
      const valorRaw = inputValue.trim().toUpperCase(); 
      
      if (paso === 1) {
          const esLugar = valorRaw.startsWith("E.") || valorRaw.length <= 4;
          if (esLugar) enviarAlServidor(null, valorRaw); 
          else { 
              setRutTemporal(valorRaw.replace(/[^0-9kK]/g, '')); 
              setInputValue(''); setPaso(2); 
              setMensaje({ tipo: 'info', texto: 'RUT LEÍDO', detalle: 'Ahora escanee el LUGAR' }); 
          }
      } else if (paso === 2) enviarAlServidor(rutTemporal, valorRaw); 
    }
  };

  const cancelarCiclo = () => {
      setPaso(1); setRutTemporal(''); setInputValue(''); setMensaje(null); inputRef.current?.focus();
  };

  const confirmarVisita = () => {
      if (!nombreVisita.trim()) return alert("Debe ingresar el nombre");
      enviarAlServidor(rutTemporal, lugarPendiente, {
          nombre: nombreVisita, patente: patenteVisita, zona: zonaVisita
      });
  };

  // ==========================================
  // 6. RENDERIZADO
  // ==========================================
  return (
    <div className="guardia-dashboard" style={{ background: '#f4f6f9' }}>
      
      {/* HEADER */}
      <div className="barra-superior-admin" style={estiloHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'white' }}>
            <img src="/DuocUC-1024x252.png" alt="Logo Duoc UC" style={{ height: '55px', filter: 'brightness(0) invert(1)' }} />
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>PORTAL {rolUsuario?.toUpperCase()}</span>
        </div>
        
        <div className="controles-vista" style={{ display: 'flex', gap: '10px' }}>
            <button className={`btn-toggle ${vista === 'mapa' ? 'activo' : ''}`} onClick={() => setVista('mapa')}>VISIÓN GLOBAL MAPA</button>
            <button className={`btn-toggle ${vista === 'historial' ? 'activo' : ''}`} onClick={() => setVista('historial')}>📋 REGISTRO ACCESOS</button>
            <button className={`btn-toggle ${vista === 'usuarios' ? 'activo' : ''}`} onClick={() => setVista('usuarios')}>GESTIÓN EQUIPO</button>
            
            <button onClick={() => setMostrarMover(true)} title="Reubicar Vehículo" style={btnIconoStyle}>🔄</button>
            <button onClick={() => setMostrarConfig(true)} title="Configurar Clave" style={btnIconoStyle}>⚙️</button>
        </div>
      </div>

      <div className="contenido-dinamico" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* VISTA 1: MAPA + PISTOLEO */}
        {vista === 'mapa' && (
           <>
             <div className={`barra-accion ${mensaje ? mensaje.tipo : ''}`} style={{ margin: '10px 20px', borderRadius: '8px' }}>
                <div className="input-zona">
                    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '15px' }}>
                        <span style={{ color: paso === 2 ? '#FFB500' : 'white', fontWeight: 'bold' }}>
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
                        style={inputScannerStyle}
                    />
                    {paso === 2 && <button onClick={cancelarCiclo} style={btnCancelarStyle}>CANCELAR</button>}
                </div>

                {mensaje && (
                    <div className="notificacion-flotante" style={{ marginLeft: 'auto', paddingRight: '20px' }}>
                        <span className="titulo-notif" style={{ display: 'block', fontWeight: 'bold' }}>{mensaje.texto}</span>
                        <span className="detalle-notif"> {mensaje.detalle}</span>
                    </div>
                )}
             </div>

             <div style={{ flex: 1, padding: '0 20px 20px 20px' }}>
                <Mapa 
                    datosIngreso={datosMapa} 
                    recargar={triggerGeneral} 
                    alCambiarModal={setBloqueoFoco} 
                />
             </div>
           </>
        )}

        {/* VISTA 2: HISTORIAL */}
        {vista === 'historial' && (
           <Historial token={null} /> 
        )}

        {/* VISTA 3: GESTIÓN DE USUARIOS */}
        {vista === 'usuarios' && (
           <div style={{ padding: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={cardStyle}>
                  <h3 style={tituloCardStyle}>Nuevo Usuario</h3>
                  <form onSubmit={handleCrearUsuario} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <select value={nuevoUser.rol} onChange={e => setNuevoUser({...nuevoUser, rol: e.target.value})} style={selectStyle}>
                          <option value="Guardia">Guardia</option>
                          <option value="Jefe de Seguridad">Jefe de Seguridad</option>
                          <option value="Cetecom">Cetecom</option>
                          <option value="Director de Sede">Director</option>
                          <option value="Subdirectora de Sede">Subdirectora</option>
                          <option value="Profesor">Profesor</option>
                      </select>
                      <input value={nuevoUser.username} onChange={e => setNuevoUser({...nuevoUser, username: e.target.value})} required style={inputCrudStyle} placeholder="Usuario (Login)" />
                      <input type="password" value={nuevoUser.password} onChange={e => setNuevoUser({...nuevoUser, password: e.target.value})} required style={inputCrudStyle} placeholder="Contraseña" />
                      <div style={{display:'flex', gap:'5px'}}>
                          <input value={nuevoUser.first_name} onChange={e => setNuevoUser({...nuevoUser, first_name: e.target.value})} style={inputCrudStyle} placeholder="Nombre" />
                          <input value={nuevoUser.last_name} onChange={e => setNuevoUser({...nuevoUser, last_name: e.target.value})} style={inputCrudStyle} placeholder="Apellido" />
                      </div>
                      <button type="submit" style={btnCrearStyle}>CREAR USUARIO</button>
                  </form>
              </div>

              <div style={{ ...cardStyle, flex: 1, minWidth: '400px' }}>
                  <h3 style={tituloCardStyle}>Dotación Actual</h3>
                  <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px', marginTop: '10px' }}>
                      <thead>
                          <tr style={{ background: '#bfccda', textAlign: 'left', color: '#000000', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              {/* 1. Definimos anchos fijos para alinear */}
                              <th style={{ padding: '12px', width: '25%', textAlign: 'center' }}>Usuario</th>
                              <th style={{ padding: '12px', width: '35%', textAlign: 'center' }}>Nombre</th>
                              <th style={{ padding: '12px', width: '25%', textAlign: 'center' }}>Rol</th>
                              <th style={{ padding: '12px', width: '15%', textAlign: 'center' }}>Acciones</th>
                          </tr>
                      </thead>
                      <tbody>
                          {usuarios.map(u => (
                              <tr key={u.id} style={{ background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: '0.2s' }}>
                                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#002D5C', borderBottom: '1px solid #eee' }}>{u.username}</td>
                                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{u.nombre_completo}</td>
                                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}><span style={badgeStyle(u.rol)}>{u.rol}</span></td>
                                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #eee' }}>
                                      <button onClick={() => handleEliminar(u.id, u.username)} style={btnEliminarStyle}>ELIMINAR</button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
           </div>
        )}
      </div>

      {/* MODALES */}
      {modalVisita && (
        <div style={overlayStyle}>
            <div style={modalContentStyle}>
                <h2 style={{color: '#002D5C', marginTop: 0}}>👤 NUEVA VISITA</h2>
                <p style={{fontSize: '13px', color: '#666'}}>Destino: <strong>{lugarPendiente}</strong></p>
                <input ref={inputNombreRef} type="text" placeholder="Nombre Completo *" value={nombreVisita} onChange={(e) => setNombreVisita(e.target.value)} style={inputModalStyle} />
                <input type="text" placeholder="Patente (Opcional)" value={patenteVisita} onChange={(e) => setPatenteVisita(e.target.value.toUpperCase())} style={inputModalStyle} maxLength={6} />
                <select value={zonaVisita} onChange={(e) => setZonaVisita(e.target.value)} style={inputModalStyle}>
                    <option value="">Seleccione Zona/Destino...</option>
                    <option value="Direccion">Dirección de Sede</option>
                    <option value="Academico">Académico</option>
                    <option value="SSGG">Servicios Generales</option>
                    <option value="Cetecom">CETECOM</option>
                    <option value="Salud">Salud</option>
                    <option value="Otro">Otro / Proveedor</option>
                </select>
                <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                    <button onClick={() => { setModalVisita(false); cancelarCiclo(); }} style={btnCancelModalStyle}>CANCELAR</button>
                    <button onClick={confirmarVisita} style={btnConfirmModalStyle}>REGISTRAR</button>
                </div>
            </div>
        </div>
      )}

      {mostrarConfig && (
        <div style={overlayStyle}>
            <div style={modalContentStyle}>
                <button onClick={() => setMostrarConfig(false)} style={closeBtnStyle}>✖️</button>
                <h3 style={{color: '#002D5C'}}>🔐 Clave Maestra</h3>
                <input type="text" placeholder="Nueva Clave" id="inputNuevaClave" style={inputModalStyle} />
                <button onClick={async () => {
                      const val = document.getElementById('inputNuevaClave').value;
                      if(!val || val.length < 4) return alert("Mínimo 4 caracteres");
                      try {
                        // ✅ CORRECCIÓN: Usamos la nueva ruta /admin/config/clave/
                        await api.post('/admin/config/clave/', { nueva_clave: val });
                        alert("Clave actualizada"); setMostrarConfig(false);
                      } catch(e) { alert("Error al actualizar"); }
                }} style={btnConfirmModalStyle}>Guardar</button>
            </div>
        </div>
      )}

      {mostrarMover && (
        <div style={overlayStyle}>
            <div style={modalContentStyle}>
                <button onClick={() => setMostrarMover(false)} style={closeBtnStyle}>✖️</button>
                <h3 style={{color: '#002D5C'}}>🔄 Reubicar Vehículo</h3>
                
                <p style={{fontSize:'12px', color:'#666'}}>Mover un auto de un lugar a otro.</p>

                <div style={{display:'flex', gap:'10px', marginBottom: '20px'}}>
                    <input id="inputOrigen" placeholder="Origen (Ej: E.5)" style={inputModalStyle} />
                    <input id="inputDestino" placeholder="Destino (Ej: E.10)" style={inputModalStyle} />
                </div>
                
                {/* 1. Usamos el modelo de admin para pedir clave maestra de confirmación */}
                <input id="inputClaveMover" type="password" placeholder="Clave Maestra" style={{...inputModalStyle, borderColor: '#dc3545', background: '#fff8f8'}} />

                <button onClick={async () => {
                    const o = document.getElementById('inputOrigen').value;
                    const d = document.getElementById('inputDestino').value;
                    const p = document.getElementById('inputClaveMover').value;
                    
                    if(!o || !d || !p) return alert("Faltan datos");

                    try {
                        // ✅ CORRECCIÓN: Ya funciona bien con la ruta existente en mapa, pero requiere clave que vive en admin
                        await api.post('/cambiar-lugar/', { lugar_origen: o, lugar_destino: d, password: p });
                        alert("✅ Vehículo movido exitosamente"); 
                        setMostrarMover(false); 
                        setTriggerGeneral(t => t+1);
                    } catch(e) { 
                        alert(e.response?.data?.error || "Error al mover"); 
                    }
                }} style={{...btnConfirmModalStyle, background: '#007bff'}}>CONFIRMAR CAMBIO</button>
            </div>
        </div>
      )}

    </div>
  );
};

// ==========================================
// 7. ESTILOS (IGUAL QUE ANTES)
// ==========================================
const estiloHeader = { background: '#002D5C', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' };
const btnIconoStyle = { background: 'rgba(255,255,255,0.2)', border: '1px solid white', color: 'white', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const inputScannerStyle = { border: 'none', background: 'white', borderRadius: '4px', padding: '10px', width: '300px', textAlign: 'center', fontWeight: 'bold', fontSize: '18px', color: 'black' };
const btnCancelarStyle = { marginLeft: '15px', background: '#dc3545', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' };
const cardStyle = { background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' };
const tituloCardStyle = { color: '#002D5C', marginTop: 0, borderBottom: '2px solid #FFB500', paddingBottom: '10px' };
const selectStyle = { padding: '10px', width: '100%', border: '1px solid #002D5C', borderRadius: '5px', background: '#f0f7ff', fontWeight: 'bold' };
const inputCrudStyle = { padding: '10px', width: '100%', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' };
const btnCrearStyle = { background: '#002D5C', color: 'white', padding: '12px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px', width: '100%' };
const btnEliminarStyle = { background: 'transparent', border: '1px solid #dc3545', color: '#dc3545', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' };
const badgeStyle = (rol) => ({ background: rol==='Jefe de Seguridad'?'#d4edda':(rol==='Visita'?'#fff3cd':'#cce5ff'), color: rol==='Jefe de Seguridad'?'#155724':(rol==='Visita'?'#856404':'#004085'), padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', border: '1px solid rgba(0,0,0,0.1)' });
const overlayStyle = { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' };
const modalContentStyle = { background: 'white', padding: '30px', borderRadius: '10px', width: '400px', position: 'relative', borderTop: '5px solid #002D5C' };
const inputModalStyle = { width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' };
const btnCancelModalStyle = { flex: 1, padding: '12px', background: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const btnConfirmModalStyle = { flex: 1, padding: '12px', background: '#002D5C', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const closeBtnStyle = { position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer' };

export default PanelAdmin;