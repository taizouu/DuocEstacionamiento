import client from './api';

const obtenerMapa = async () => {
    // Declaramos la ruta completa
    const response = await client.get('/api/mapa/');
    return response.data; 
};

const liberarLugar = async (idLugar, password) => {
    // Ojo aquí: asegúrate de que en el urls.py de Django esta ruta esté bajo /api/ o ajusta esto
    const response = await client.post('/api/liberar-manual/', {
        id_lugar: idLugar,
        password: password
    });
    return response.data;
};

const registrarPistoleo = async (rut, idLugar, nombreVisita = null) => {
    const payload = { rut, id_lugar: idLugar };
    if (nombreVisita) payload.nombre_visita = nombreVisita;

    const response = await client.post('/api/pistoleo/', payload);
    return response.data;
};

const moverVehiculo = async (origen, destino, password) => {
    const response = await client.post('/api/cambiar-lugar/', {
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