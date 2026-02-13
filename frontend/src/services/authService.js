// src/services/authService.js
import client from '../api/client';

const login = async (username, password) => {
    // Usamos 'client' en lugar de 'axios'. Ya tiene la URL base.
    const response = await client.post('/token/', { username, password });
    
    // Si la respuesta es correcta, guardamos los datos aquí (Centralización)
    if (response.data.access) {
        localStorage.setItem('token', response.data.access);
        // Guardamos user_data como string
        localStorage.setItem('user_data', JSON.stringify(response.data.user_data));
    }
    
    return response.data;
};

const logout = () => {
    localStorage.clear();
    // Podrías agregar lógica extra aquí si fuera necesario
};

// Objeto exportado con las funciones
const authService = {
    login,
    logout
};

export default authService;