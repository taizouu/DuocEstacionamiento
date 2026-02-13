// src/api/client.js
import axios from 'axios';

// 1. URL BASE INTELIGENTE
// Si existe la variable de entorno (Producción), úsala. Si no, usa localhost (Desarrollo).
const BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. INTERCEPTOR DE PETICIÓN (Request)
// Inyecta el token automáticamente en CADA petición que salga.
client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 3. INTERCEPTOR DE RESPUESTA (Response)
// Manejo global de errores. Si el token vence (Error 401), limpia todo.
client.interceptors.response.use(
    (response) => response,
    (error) => {
        // Si el servidor dice "No autorizado" (Token vencido o falso)
        if (error.response && error.response.status === 401) {
            console.warn("⚠️ Sesión expirada o inválida. Cerrando sesión...");
            localStorage.clear();
            // Opcional: Forzar recarga para volver al Login
            // window.location.href = '/'; 
        }
        return Promise.reject(error);
    }
);

export default client;