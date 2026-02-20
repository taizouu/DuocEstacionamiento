import api from './api'; 

export const login = async (username, password) => {
    // Fíjate que ahora declaramos la ruta completa desde la raíz
    const response = await api.post('/api/token/', { username, password });
    
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