import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Mapa from './Mapa'; 
import './PanelGuardia.css'; 

const PanelAdmin = ({ token, rolUsuario }) => {
  const [vista, setVista] = useState('usuarios'); 
  const [usuarios, setUsuarios] = useState([]);
  
  // Estados para los Modales
  const [mostrarConfig, setMostrarConfig] = useState(false);
  const [mostrarMover, setMostrarMover] = useState(false);
  
  const [nuevoUser, setNuevoUser] = useState({ 
      username: '', password: '', first_name: '', last_name: '', rol: 'Guardia' 
  });

  useEffect(() => {
    // Si estamos en vista usuarios, cargamos la lista.
    if (vista === 'usuarios') cargarUsuarios();
  }, [vista]);

  const cargarUsuarios = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get('http://127.0.0.1:8000/api/usuarios/', config);
      setUsuarios(res.data);
    } catch (e) {
      console.error("Error cargando usuarios", e);
    }
  };

  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post('http://127.0.0.1:8000/api/usuarios/', nuevoUser, config);
      
      alert(`Usuario ${nuevoUser.username} creado con éxito`);
      setNuevoUser({ username: '', password: '', first_name: '', last_name: '', rol: 'Guardia' });
      cargarUsuarios(); 
    } catch (err) {
      alert(err.response?.data?.error || "Error al crear");
    }
  };

  const handleEliminar = async (id, nombre) => {
      if(!window.confirm(`¿Estás seguro de eliminar a ${nombre}? Esta acción no se puede deshacer.`)) return;

      try {
        const config = { headers: { Authorization: `Bearer ${token}` }, params: { id: id } };
        await axios.delete('http://127.0.0.1:8000/api/usuarios/', config);
        cargarUsuarios(); 
      } catch (err) {
        alert(err.response?.data?.error || "Error al eliminar");
      }
  };

  return (
    <div className="guardia-dashboard">
      
      {/* BARRA SUPERIOR (Siempre visible) */}
      <div className="barra-accion" style={{ background: '#1817176b', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#002D5C', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
                src="DuocUC-1024x252.png" 
                alt="Logo Duoc" 
                style={{ height: '60px', marginBottom: '20px' }} 
            />
            <span>{rolUsuario === 'Cetecom' ? '💻' : '🛡️'}🛡️ PORTAL DE SEGURIDAD {rolUsuario}</span>
        </div>
        
        <div className="controles-vista">
            <button className={`btn-toggle ${vista === 'usuarios' ? 'activo' : ''}`} onClick={() => setVista('usuarios')}>GESTIÓN EQUIPO</button>
            <button className={`btn-toggle ${vista === 'mapa' ? 'activo' : ''}`} onClick={() => setVista('mapa')}>VISIÓN GLOBAL MAPA</button>
            
            {/* BOTÓN MOVER VEHÍCULO (AZUL) */}
            <button 
                onClick={() => setMostrarMover(true)}
                title="Reubicar Vehículo"
                style={{
                    background: 'rgba(0, 123, 255, 0.2)', 
                    border: '1px solid #007bff', 
                    color: '#007bff',
                    borderRadius: '50%', width: '35px', height: '35px', 
                    cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center',
                    fontSize: '18px', marginRight: '10px'
                }}
            >
                🔄
            </button>

            {/* BOTÓN DE CONFIGURACIÓN (AMARILLO) */}
            <button 
                onClick={() => setMostrarConfig(true)}
                title="Configurar Clave Maestra"
                style={{
                    background: 'rgba(255, 181, 0, 0.2)', 
                    border: '1px solid #FFB500', 
                    color: '#FFB500',
                    borderRadius: '50%', 
                    width: '35px', 
                    height: '35px', 
                    cursor: 'pointer',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    fontSize: '18px'
                }}
            >
                ⚙️
            </button>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL (Cambia según la pestaña) */}
      <div className="contenido-dinamico" style={{ padding: '20px' }}>
        
        {vista === 'mapa' ? (
           // VISTA 1: MAPA
           <Mapa token={token} />
        ) : (
           // VISTA 2: GESTIÓN DE USUARIOS
           <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              
              {/* === FORMULARIO CREAR === */}
              <div style={{ background: 'white', padding: '25px', borderRadius: '8px', width: '300px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                  <h3 style={{ color: '#002D5C', marginTop: 0, borderBottom: '2px solid #FFB500', paddingBottom: '10px' }}>
                      Nuevo Usuario
                  </h3>
                  <form onSubmit={handleCrearUsuario} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      
                      {/* SELECTOR DE ROL */}
                      <div>
                        <label style={labelStyle}>Rol Asignado</label>
                        <select 
                            name="campo_rol"
                            value={nuevoUser.rol} 
                            onChange={e => setNuevoUser({...nuevoUser, rol: e.target.value})}
                            style={{...estiloInput, background: '#f0f7ff', borderColor: '#002D5C', fontWeight: 'bold'}}
                        >
                            <optgroup label="Operaciones">
                                <option value="Guardia">Guardia de Turno</option>
                            </optgroup>
                            <optgroup label="Administración">
                                <option value="Jefe de Seguridad">Jefe de Seguridad</option>
                                <option value="Cetecom">CETECOM (Soporte)</option>
                            </optgroup>
                            <optgroup label="Dirección Sede">
                                <option value="Director de Sede">Director de Sede</option>
                                <option value="Subdirectora de Sede">Subdirectora de Sede</option>
                            </optgroup>
                            <optgroup label="Académico">
                                <option value="Profesor">🎓 Profesor</option>
                            </optgroup>
                        </select>
                      </div>

                      <div>
                        <label style={labelStyle}>Usuario (Login)</label>
                        <input value={nuevoUser.username} onChange={e => setNuevoUser({...nuevoUser, username: e.target.value})} required style={estiloInput} placeholder="Ej: gtorres" />
                      </div>
                      <div>
                        <label style={labelStyle}>Contraseña</label>
                        <input type="password" value={nuevoUser.password} onChange={e => setNuevoUser({...nuevoUser, password: e.target.value})} required style={estiloInput} placeholder="••••••" />
                      </div>
                      <div style={{display:'flex', gap:'5px'}}>
                          <input value={nuevoUser.first_name} onChange={e => setNuevoUser({...nuevoUser, first_name: e.target.value})} style={estiloInput} placeholder="Nombre" />
                          <input value={nuevoUser.last_name} onChange={e => setNuevoUser({...nuevoUser, last_name: e.target.value})} style={estiloInput} placeholder="Apellido" />
                      </div>
                      
                      <button type="submit" style={{ background: '#002D5C', color: 'white', padding: '12px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
                          CREAR USUARIO
                      </button>
                  </form>
              </div>

              {/* === LISTA DE PERSONAL === */}
              <div style={{ flex: 1, background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', minWidth: '400px' }}>
                  <h3 style={{ color: '#002D5C', marginTop: 0, borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                      Dotación Actual
                  </h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                      <thead>
                          <tr style={{ background: '#f8f9fa', textAlign: 'left', color: '#666', fontSize: '13px', textTransform: 'uppercase' }}>
                              <th style={{ padding: '10px' }}>Usuario</th>
                              <th>Nombre</th>
                              <th>Rol</th>
                              <th style={{textAlign: 'center'}}>Acciones</th>
                          </tr>
                      </thead>
                      <tbody>
                          {usuarios.map(u => (
                              <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
                                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#333' }}>{u.username}</td>
                                  <td>{u.nombre_completo}</td>
                                  <td>
                                      {(() => {
                                          let colorFondo = '#cce5ff'; 
                                          let colorTexto = '#004085';
                                          let etiqueta = u.rol ? u.rol.toUpperCase() : 'SIN ROL';

                                          if (u.rol === 'Jefe de Seguridad') {
                                              colorFondo = '#d4edda'; colorTexto = '#155724'; 
                                          } else if (u.rol === 'Cetecom') {
                                              colorFondo = '#fff3cd'; colorTexto = '#856404'; 
                                          } else if (u.rol === 'Director de Sede' || u.rol === 'Subdirectora de Sede') {
                                              colorFondo = '#f8d7da'; colorTexto = '#721c24'; 
                                          } else if (u.rol === 'Profesor') {
                                              colorFondo = '#e2e3e5'; colorTexto = '#383d41'; 
                                          }

                                          return (
                                              <span style={{ 
                                                  background: colorFondo, 
                                                  color: colorTexto,
                                                  padding: '4px 8px', 
                                                  borderRadius: '4px', 
                                                  fontSize: '11px', 
                                                  fontWeight: 'bold', 
                                                  border: '1px solid rgba(0,0,0,0.1)'
                                              }}>
                                                  {etiqueta}
                                              </span>
                                          );
                                      })()}
                                  </td>
                                  <td style={{textAlign: 'center'}}>
                                      <button 
                                        onClick={() => handleEliminar(u.id, u.username)}
                                        style={{ background: 'transparent', border: '1px solid #dc3545', color: '#dc3545', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}
                                        title="Eliminar usuario"
                                      >
                                          ELIMINAR
                                      </button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
                  {usuarios.length === 0 && <p style={{color: '#999', textAlign: 'center', marginTop: '30px'}}>Cargando personal...</p>}
              </div>

           </div>
        )}
      </div>

      {mostrarConfig && (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.7)', zIndex: 9999,
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
            <div style={{ 
                background: 'white', padding: '30px', borderRadius: '10px', 
                width: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                borderTop: '5px solid #FFB500', position: 'relative'
            }}>
                <button 
                    onClick={() => setMostrarConfig(false)}
                    style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer' }}
                >✖️</button>

                <h3 style={{ color: '#002D5C', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    🔐 Seguridad
                </h3>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5' }}>
                    Actualice la <strong>Clave Maestra</strong> utilizada para liberar estacionamientos manualmente ante fallas del sistema.
                </p>

                <div style={{ marginTop: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '12px' }}>NUEVA CLAVE ADMINISTRATIVA</label>
                    <input 
                        type="text" 
                        placeholder="Ej: segura2024"
                        id="inputNuevaClave"
                        style={{ 
                            width: '100%', padding: '10px', borderRadius: '5px', 
                            border: '1px solid #ccc', marginBottom: '15px',
                            boxSizing: 'border-box'
                        }}
                    />
                    
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button 
                            onClick={() => setMostrarConfig(false)}
                            style={{ background: '#eee', color: '#333', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            Cancelar
                        </button>
                        <button 
                            onClick={async () => {
                                const input = document.getElementById('inputNuevaClave');
                                const nuevaClave = input.value;
                                if(!nuevaClave || nuevaClave.length < 4) return alert("La clave debe tener al menos 4 caracteres");
                                
                                try {
                                    await axios.post('http://127.0.0.1:8000/api/config/clave/', 
                                        { nueva_clave: nuevaClave }, 
                                        { headers: { Authorization: `Bearer ${token}` } }
                                    );
                                    alert("✅ Clave Maestra actualizada con éxito");
                                    setMostrarConfig(false);
                                } catch (e) {
                                    alert("Error al actualizar clave: " + (e.response?.data?.error || "Desconocido"));
                                }
                            }}
                            style={{ background: '#002D5C', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* MODAL 2: MOVER VEHÍCULO (Con Clave Maestra) */}
      {mostrarMover && (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.7)', zIndex: 9999,
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
            <div style={{ 
                background: 'white', padding: '30px', borderRadius: '10px', 
                width: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                borderTop: '5px solid #007bff', position: 'relative'
            }}>
                <button 
                    onClick={() => setMostrarMover(false)}
                    style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer' }}
                >✖️</button>

                <h3 style={{ color: '#002D5C', marginTop: 0 }}>🔄 Reubicar Vehículo</h3>
                <p style={{ fontSize: '13px', color: '#666' }}>
                    Mueve un vehículo de un estacionamiento ocupado a uno libre. <strong>Requiere autorización.</strong>
                </p>

                <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '11px', fontWeight: 'bold' }}>ORIGEN (Ocupado)</label>
                        <input id="inputOrigen" type="text" placeholder="Ej: E.5" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', paddingTop: '15px' }}>➡️</div>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '11px', fontWeight: 'bold' }}>DESTINO (Libre)</label>
                        <input id="inputDestino" type="text" placeholder="Ej: E.10" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
                    </div>
                </div>

                {/* CAMPO DE CLAVE MAESTRA */}
                <div style={{ marginTop: '15px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#dc3545' }}>🔐 CLAVE MAESTRA</label>
                    <input 
                        id="inputClaveMover" 
                        type="password" 
                        placeholder="Ingrese clave de autorización..." 
                        style={{ width: '100%', padding: '10px', border: '1px solid #dc3545', borderRadius: '4px', background: '#fff8f8', boxSizing: 'border-box' }} 
                    />
                </div>
                
                <button 
                    onClick={async () => {
                        const origen = document.getElementById('inputOrigen').value;
                        const destino = document.getElementById('inputDestino').value;
                        const pass = document.getElementById('inputClaveMover').value;

                        if(!origen || !destino || !pass) return alert("Complete todos los campos y la clave");

                        try {
                            const config = { headers: { Authorization: `Bearer ${token}` } };
                            // Enviamos los 3 datos al backend
                            await axios.post('http://127.0.0.1:8000/api/cambiar-lugar/', 
                                { 
                                    lugar_origen: origen, 
                                    lugar_destino: destino,
                                    password: pass 
                                }, config
                            );
                            alert("✅ Cambio realizado con éxito");
                            setMostrarMover(false);
                            // Opcional: Si estamos en vista mapa, podrías forzar recarga, 
                            // pero por ahora el cambio de estado se notará al interactuar.
                        } catch (e) {
                            alert("Error: " + (e.response?.data?.error || "Desconocido"));
                        }
                    }}
                    style={{ 
                        marginTop: '20px', width: '100%', background: '#007bff', color: 'white', 
                        border: 'none', padding: '10px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' 
                    }}
                >
                    CONFIRMAR CAMBIO
                </button>
            </div>
        </div>
      )}

    </div>
  );
};

const estiloInput = {
    padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '100%', boxSizing: 'border-box', fontSize: '14px'
};

const labelStyle = {
    fontSize: '11px', fontWeight: 'bold', color: '#666', marginBottom: '4px', display: 'block', textTransform: 'uppercase'
};

export default PanelAdmin;