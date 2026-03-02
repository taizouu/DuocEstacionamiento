import axios from 'axios';

// 1. CONFIGURACIÓN BASE
// Apuntamos estrictamente a la raíz del servidor.
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://10.208.0.60:8000', 
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, 
});

// 2. INTERCEPTOR DE SOLICITUD (REQUEST) 🛡️
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
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
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Si el token venció, es inválido o no hay sesión (Error 401 o 403)
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.warn("⚠️ Sesión expirada o no autorizada. Redirigiendo al login...");
            
            // Limpiamos el rastro de la sesión muerta
            localStorage.removeItem('token');
            localStorage.removeItem('user_data');
            
            // Forzamos la salida al monitor público/login
            window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

export default api;