import React, { useState, useEffect, useCallback } from 'react';
import mapaService from '../services/mapaService'; 
import './Mapa.css';

const Mapa = ({ datosIngreso, recargar, token, alCambiarModal }) => {
    
    // --- 1. ESTADOS ---
    const [lugares, setLugares] = useState({});
    
    const [ultimoIngreso, setUltimoIngreso] = useState({
        patente: "---", nombre: "Esperando ingreso...", hora: "--:--"
    });

    // Tooltip (Pop-up) y Modal
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, id: null });
    const [modal, setModal] = useState({ abierto: false, lugarId: null, pass: "" });

    useEffect(() => {
        if (alCambiarModal) alCambiarModal(modal.abierto);
    }, [modal.abierto, alCambiarModal]);


const cargarDatos = useCallback(async () => {
        try {
            const data = await mapaService.obtenerMapa();
            
            // A. Procesamos los lugares (Ahora vienen dentro de data.lugares)
            // IMPORTANTE: Antes 'data' era el array, ahora es 'data.lugares'
            const listaLugares = data.lugares || []; 
            const dic = {};
            listaLugares.forEach(l => dic[l.id_lugar] = l);
            setLugares(dic);

            // B. Procesamos el último ingreso (Para que lo vean TODOS)
            if (data.ultimo_ingreso) {
                // Solo actualizamos si no viene null
                setUltimoIngreso(data.ultimo_ingreso);
            }

        } catch (e) { 
            console.error("Error cargando mapa:", e); 
        }
    }, []);
    
    // --- 3. ACTUALIZACIÓN VISUAL ---
    useEffect(() => {
        if (datosIngreso) setUltimoIngreso(datosIngreso);
    }, [datosIngreso]);

    // --- 4. POLLING ---
    useEffect(() => {
        cargarDatos(); 
        const intervalo = setInterval(cargarDatos, 3000); 
        return () => clearInterval(intervalo); 
    }, [cargarDatos, recargar]); 


    // --- 5. HANDLER: LIBERAR LUGAR ---
    const handleLiberarAction = async () => {
        if (!modal.pass) return alert("Clave requerida");
        
        try {
            await mapaService.liberarLugar(modal.lugarId, modal.pass);
            setModal({ abierto: false, lugarId: null, pass: "" });
            cargarDatos(); 
            alert("✅ Lugar liberado correctamente");
        } catch (err) {
            console.error(err);
            const errorMsg = err.response?.data?.error || "Error de autorización";
            alert("⛔ " + errorMsg);
        }
    };

    // --- 6. SUB-COMPONENTES (Celdas, Tooltips) ---
    
    const Celda = ({ id, w = 1, h = 1, txt = null }) => {
        // Normalización de ID para búsqueda segura
        const idNormalizado = id.toString().startsWith("E.") ? id : (isNaN(id) ? `E.${id}` : `E.${id}`);
        // Buscamos en el diccionario (intentamos ambas formas por seguridad)
        const info = lugares[id] || lugares[idNormalizado] || lugares[`E.${id}`];
        const estaOcupado = info?.ocupado;

return (
            <div 
                className={`celda ${estaOcupado ? 'ocupado' : 'libre'}`} 
                style={{ 
                    width: `calc(var(--cell-size) * ${w})`, 
                    height: `calc(var(--cell-size) * ${h})`,
                    cursor: estaOcupado ? 'pointer' : 'default'
                }}
                onMouseEnter={(e) => {
                    if (estaOcupado) {
                        // Si está ocupado, abrimos el tooltip
                        setTooltip({ visible: true, x: e.clientX, y: e.clientY, id: id });
                    } else {
                        // CORRECCIÓN CLAVE: 
                        // Si entro a un lugar LIBRE, fuerzo el cierre inmediato del tooltip
                        // para evitar que quede pegada la info del auto anterior.
                        setTooltip({ visible: false, x: 0, y: 0, id: null });
                    }
                }}
                onMouseMove={(e) => {
                    // Solo actualizamos la posición si REALMENTE hay un tooltip visible Y es un lugar ocupado.
                    // Esto evita arrastrar el tooltip fantasma por el mapa.
                    if (tooltip.visible && estaOcupado) {
                        setTooltip(prev => ({ ...prev, x: e.clientX, y: e.clientY }));
                    }
                }}
                onMouseLeave={() => {
                    // Al salir, cerramos siempre por seguridad
                    setTooltip({ visible: false, x: 0, y: 0, id: null });
                }}
                onClick={() => estaOcupado && setModal({ abierto: true, lugarId: id, pass: "" })}
            >
                {txt || id}
            </div>
        );
    };

    const ParDoble = ({ n }) => (
        <div className="par-doble"><Celda id={`${n}B`} /><Celda id={`${n}A`} /></div>
    );

    const ZonaAzul = ({ texto, w = 1, h = 1, vertical = false }) => (
        <div className="azul" style={{ width: `calc(var(--cell-size) * ${w})`, height: `calc(var(--cell-size) * ${h})` }}>
            <span className={vertical ? "texto-vertical" : ""}>{texto}</span>
        </div>
    );

    const getDatosOcupante = () => {
        if (!tooltip.visible || !tooltip.id) return null;
        
        // Búsqueda robusta del lugar
        const id = tooltip.id;
        const info = lugares[id] || lugares[`E.${id}`];
        
        return info ? info.ocupado_por : null;
    };

    const datosOcupante = getDatosOcupante();

    return (
        <div className="contenedor-principal" style={{ position: 'relative' }}>
            
            {/* === POP-UP / TOOLTIP MEJORADO === */}
            {tooltip.visible && datosOcupante && (
                <div 
                    className="tooltip-flotante" 
                    style={{ 
                        top: tooltip.y + 15, 
                        left: tooltip.x + 15, 
                        position: 'fixed', 
                        zIndex: 3000, 
                        pointerEvents: 'none', // Importante para que no parpadee al mover el mouse
                        background: 'rgba(0, 45, 92, 0.95)', // Azul Duoc oscuro semi-transparente
                        color: 'white',
                        padding: '12px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                        minWidth: '180px',
                        fontSize: '13px',
                        backdropFilter: 'blur(4px)'
                    }}
                >
                    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '5px', marginBottom: '5px', fontWeight: 'bold', textTransform: 'uppercase', color: '#FFB500' }}>
                        Estacionamiento {tooltip.id}
                    </div>
                    
                    <div style={{ marginBottom: '4px' }}>
                        <span style={{ opacity: 0.7 }}>Nombre:</span> <br/>
                        <strong>{datosOcupante.nombre}</strong>
                    </div>
                    
                    <div style={{ marginBottom: '4px' }}>
                        <span style={{ opacity: 0.7 }}>Cargo:</span> <br/>
                        <span style={{ background: 'white', color: '#002D5C', padding: '1px 5px', borderRadius: '3px', fontWeight: 'bold', fontSize: '11px' }}>
                            {datosOcupante.cargo || 'Visita'}
                        </span>
                    </div>

                    <div style={{ marginBottom: '4px' }}>
                        <span style={{ opacity: 0.7 }}>Patente:</span> <br/>
                        <strong style={{ letterSpacing: '1px' }}>{datosOcupante.ppu || "---"}</strong>
                    </div>

                    {datosOcupante.destino && (
                        <div>
                            <span style={{ opacity: 0.7 }}>Destino:</span> <br/>
                            <i>{datosOcupante.destino}</i>
                        </div>
                    )}
                </div>
            )}

            {/* MODAL DE LIBERACIÓN */}
            {modal.abierto && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <h3 style={{color: '#002D5C', marginTop:0}}>Liberar {modal.lugarId}</h3>
                        <p style={{fontSize:'13px'}}>Ingrese clave administrativa:</p>
                        <input 
                            type="password" 
                            style={styles.input}
                            value={modal.pass}
                            onChange={(e) => setModal({...modal, pass: e.target.value})}
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && handleLiberarAction()}
                        />
                        <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                            <button onClick={handleLiberarAction} style={styles.btnOk}>LIBERAR</button>
                            <button onClick={() => setModal({abierto: false, lugarId: null, pass: ""})} style={styles.btnCancel}>CANCELAR</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="layout-macro">
                {/* 1. SECTOR IZQUIERDO (Bodegas y 90s) */}
                <div className="flex-row">
                    <div className="flex-col">
                        <ZonaAzul texto="Bodegas" w={1} h={6} vertical={true} />
                        {[93,92,91,90,89,88,87,86,85,84].map(n => <Celda key={`${n}B`} id={`${n}B`} />)}
                    </div>
                    <div className="flex-col">
                        {[99,98,97,96,95].map(n => <Celda key={n} id={String(n)} />)}
                        <Celda id="94A" />
                        {[93,92,91,90,89,88,87,86,85,84].map(n => <Celda key={`${n}A`} id={`${n}A`} />)}
                    </div>
                </div>

                {/* 2. SECTOR CENTRAL Y DERECHO */}
                <div className="flex-col">
                    {/* FILA SUPERIOR (1 al 22) */}
                    <div className="flex-row" style={{ alignItems: 'flex-end', marginBottom: '25px' }}>
                        <div style={{ marginRight: '20px' }}><ZonaAzul texto="Caja Escala" w={2} h={2} /></div>
                        <div className="flex-col">
                            <ZonaAzul texto="Bodegas" w={8} h={1} />
                            <div className="flex-row">
                                <Celda id="1" /> <Celda id="2" />
                                <Celda id="3" w={4} />
                                <Celda id="4" /> <Celda id="5" />
                            </div>
                        </div>
                        <div className="flex-row">
                            {[6,7,8,9,10,11,12,13,14,15].map(n => <ParDoble key={n} n={n} />)}
                            <ParDoble n={16} />
                        </div>
                        <ZonaAzul texto="Gr.Elec" w={0.8} h={2} vertical={true} />
                        <div className="flex-row" style={{ marginLeft: '5px' }}>
                            {[17,18,19,20,21,22].map(n => <ParDoble key={n} n={n} />)}
                        </div>
                    </div>

                    {/* ZONA MEDIA (75-83 y Cuadro Info) */}
                    <div className="flex-row" style={{ alignItems: 'flex-start' }}>
                        <div className="flex-col">
                            {[83,82,81,80,79,78,77,76,75].map(n => <Celda key={n} id={String(n)} />)}
                        </div>

                        {/* PANEL INFO CENTRAL (ESTÁTICO) */}
                        <div className="panel-info">
                            <h3>ULTIMO INGRESO</h3>
                            <div className="dato-fila">
                                <span className="dato-label">Patente:</span>
                                <span className="dato-valor">{ultimoIngreso.patente}</span>
                            </div>
                            <div className="dato-fila">
                                <span className="dato-label">Nombre:</span>
                                <span className="dato-valor">{ultimoIngreso.nombre}</span>
                            </div>
                            <div className="dato-fila">
                                <span className="dato-label">Hora:</span>
                                <span className="dato-valor">{ultimoIngreso.hora}</span>
                            </div>
                        </div>

                        {/* ZONA MEDIA-DERECHA (23-46) */}
                        <div className="flex-row" style={{ alignItems: 'flex-start', marginLeft: '215px' }}>
                            <div className="flex-col">
                                {[23,24,25,26,27,28,29,30,31,32].map(n => <Celda key={n} id={String(n)} />)}
                                <div style={{ height: '32px' }}></div> 
                                <div className="flex-row"><Celda id="45" /> <Celda id="44"/></div>
                            </div>
                            <div style={{ width: '30px' }}></div>
                            <div className="flex-col">
                                {[33,34,35,36,37,38,39,40,41,42,43].map(n => <Celda key={n} id={String(n)} />)}
                            </div>
                            <div className="flex-col">
                                <ZonaAzul texto="Sala Eléctrica" w={2} h={5} vertical={true} />
                                <ZonaAzul texto="Bodega SSGG" w={2} h={5} vertical={true} />
                                <Celda id="46" /><Celda id="100" />
                            </div>
                        </div>
                    </div>

                    {/* FILA INFERIOR (47-73) */}
                    <div className="flex-row" style={{ marginTop: '40px' }}> 
                        {[73,72,71,70,69,68,67].map(n => <Celda key={n} id={String(n)} />)}
                        <Celda id="66" w={3} />
                        {[65,64,63,62,61,60,59,58,57,56,55,54,53,52,51,50,49,48,47].map(n => <Celda key={n} id={String(n)} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ESTILOS DE INGENIERÍA
const styles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 4000, 
        display: 'flex', justifyContent: 'center', alignItems: 'center'
    },
    modal: {
        background: '#fff', padding: '25px', borderRadius: '10px', 
        width: '300px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        borderTop: '5px solid #002D5C'
    },
    input: {
        width: '100%', padding: '10px', margin: '15px 0', 
        borderRadius: '5px', border: '1px solid #ccc', textAlign: 'center', fontSize: '16px'
    },
    btnOk: {
        flex: 1, padding: '10px', background: '#002D5C', color: '#fff', 
        border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'
    },
    btnCancel: {
        flex: 1, padding: '10px', background: '#eee', color: '#333', 
        border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer'
    }
};

export default Mapa;