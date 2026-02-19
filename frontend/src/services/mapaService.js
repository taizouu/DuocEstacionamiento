// src/services/mapaService.js
import client from './api';

// 1. OBTENER EL ESTADO DEL MAPA
const obtenerMapa = async () => {
    const response = await client.get('/mapa/');
    // Ahora response.data tendrá { lugares: [...], ultimo_ingreso: {...} }
    return response.data; 
};

// 2. LIBERAR LUGAR MANUALMENTE (Admin/Guardia)
const liberarLugar = async (idLugar, password) => {
    const response = await client.post('/liberar-manual/', {
        id_lugar: idLugar,
        password: password
    });
    return response.data;
};

// 3. PISTOLEO (Guardia)
const registrarPistoleo = async (rut, idLugar, nombreVisita = null) => {
    const payload = { rut, id_lugar: idLugar };
    if (nombreVisita) payload.nombre_visita = nombreVisita;

    const response = await client.post('/pistoleo/', payload);
    return response.data;
};

// 4. MOVER VEHÍCULO (Admin)
const moverVehiculo = async (origen, destino, password) => {
    const response = await client.post('/cambiar-lugar/', {
        lugar_origen: origen,
        lugar_destino: destino,
        password: password
    });
    return response.data;
};

const mapaService = {
    obtenerMapa,
    liberarLugar,
    registrarPistoleo,
    moverVehiculo
};

export default mapaService;