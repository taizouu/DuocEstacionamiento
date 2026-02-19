import axios from 'axios';

// 1. CONFIGURACIÓN BASE
// Aquí defines la URL de tu backend una sola vez.
const api = axios.create({
    baseURL: 'http://192.168.3.144:8000/api/', 
    headers: {
        'Content-Type': 'application/json',
    },
    // timeout: 10000, // (Opcional) Si el servidor tarda más de 10s, cancela.
});

// 2. INTERCEPTOR DE SOLICITUD (REQUEST) 🛡️
// Antes de que salga CUALQUIER petición, este código se ejecuta.
api.interceptors.request.use(
    (config) => {
        // Busca el token en el navegador
        const token = localStorage.getItem('token');
        
        // Si existe, lo pega en la cabecera Authorization
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. INTERCEPTOR DE RESPUESTA (RESPONSE) 🚨
// Si el backend responde con error, lo atrapamos aquí primero.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Si el token venció o es falso (Error 401)
        if (error.response && error.response.status === 401) {
            console.warn("⚠️ Sesión expirada o no autorizada.");
            
            // Opcional: Si quieres que lo saque del sistema automáticamente:
            // localStorage.clear();
            // window.location.href = '/'; 
        }
        return Promise.reject(error);
    }
);

export default api;