import axios from 'axios';
import store from '../store'

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 50000
});

instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const originalRequest = error.config;
        console.log(JSON.stringify(error))
        if (error.response.status === 401) {
            localStorage.removeItem('vue-authenticate.vueauth_token');
            delete instance.defaults.headers.common['Authorization'];
            window.location.href=process.env.VUE_APP_BASE_URL;
        }

        return Promise.reject(error);
    }
);

const accessToken = localStorage.getItem('vue-authenticate.vueauth_token');

if (accessToken) {
    console.log('Se inicializa axios con token de localstorage');
    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
} else {
    console.log('Se inicializa axios sin autenticacion');
}


export default instance;