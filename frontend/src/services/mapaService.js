import client from './api';

// Definimos la IP de tu VM directamente aquí para forzar la ruta
const API_BASE_URL = 'http://10.208.0.60:8000';

const obtenerMapa = async () => {
    // Usamos la URL absoluta concatenando la IP
    const response = await client.get(`${API_BASE_URL}/api/mapa/`);
    return response.data; 
};

const liberarLugar = async (idLugar, password) => {
    const response = await client.post(`${API_BASE_URL}/api/liberar-manual/`, {
        id_lugar: idLugar,
        password: password
    });
    return response.data;
};

const registrarPistoleo = async (rut, idLugar, nombreVisita = null) => {
    const payload = { rut, id_lugar: idLugar };
    if (nombreVisita) payload.nombre_visita = nombreVisita;

    const response = await client.post(`${API_BASE_URL}/api/pistoleo/`, payload);
    return response.data;
};

const moverVehiculo = async (origen, destino, password) => {
    const response = await client.post(`${API_BASE_URL}/api/cambiar-lugar/`, {
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