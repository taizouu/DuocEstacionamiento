// ARREGLO 1: Cambiamos '../api' por './api' porque ahora están en la misma carpeta
import api from './api'; 

// ARREGLO 2: Usamos "export const" (Exportación Nombrada)
// Esto permite que Login.js encuentre la función "login" específicamente.
export const login = async (username, password) => {
    // Usamos api.post en lugar de axios directo
    const response = await api.post('/token/', { username, password });
    
    if (response.data.access) {
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('user_data', JSON.stringify(response.data.user_data));
    }
    
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    window.location.href = '/'; 
};