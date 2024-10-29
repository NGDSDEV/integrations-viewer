import axios from 'axios';

// Configuración inicial de Axios
const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL ?? '',
});

// Configuración para el Integrador de Operadores Logísticos
const axiosLogisticsIntegrator = axios.create({
    baseURL: process.env.NEXT_PUBLIC_LOGISTICS_INTEGRATOR_URL,
});

// Función para obtener el token de acceso (OAuth 2.0 Client Credentials)
const getAccessToken = async () => {
    try {
        const clientId = process.env.NEXT_PUBLIC_CLIENT_ID ?? '';
        const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET ?? '';
        const tokenUrl = process.env.NEXT_PUBLIC_TOKEN_URL ?? '';

        const credentials = btoa(`${clientId}:${clientSecret}`); // Codificar en base64

        const response = await axios.post(tokenUrl, new URLSearchParams({
            grant_type: 'client_credentials',
            // scope: 'TU_SCOPE', // Ajusta el scope si es necesario
        }), {
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        const { access_token, expires_in } = response.data;

        // Almacena el token en localStorage con la hora de expiración
        const expirationTime = new Date().getTime() + expires_in * 1000;
        localStorage.setItem('token', access_token);
        localStorage.setItem('token_expiration', expirationTime.toString());

        return access_token;
    } catch (error) {
        console.error('Error obteniendo token de acceso:', error);
        return null;
    }
};

// Verificar si el token ha expirado
const isTokenExpired = () => {
    const expirationTime = localStorage.getItem('token_expiration');
    return !expirationTime || new Date().getTime() > Number(expirationTime);
};

// Interceptores de solicitud para axiosClient
axiosClient.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem('token');

        // Si no hay token o está expirado, obtenemos uno nuevo
        if (!token || isTokenExpired()) {
            token = await getAccessToken();
        }

        // Si se obtiene un token, añadirlo a las cabeceras
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(new Error(error.message || 'Request error'));
    }
);

// Interceptores de respuesta para axiosClient
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.log('Unauthorized');
        }
        return Promise.reject(new Error(error.message || 'Response error'));
    }
);

// Interceptores de solicitud para axiosLogisticsIntegrator
axiosLogisticsIntegrator.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem('token');

        // Si no hay token o está expirado, obtenemos uno nuevo
        if (!token || isTokenExpired()) {
            token = await getAccessToken();
        }

        // Si se obtiene un token, añadirlo a las cabeceras
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(new Error(error.message || 'Request error'));
    }
);

// Interceptores de respuesta para axiosLogisticsIntegrator
axiosLogisticsIntegrator.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.log('Unauthorized');
        }
        return Promise.reject(new Error(error.message || 'Response error'));
    }
);

export { axiosClient, axiosLogisticsIntegrator };
