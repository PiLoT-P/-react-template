import axios from "axios";
import { useAuthStore } from './stores/Auth.store';

const $axios = axios.create({
    baseURL: "http://10.0.100.140:3000",
});

$axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const authStore = useAuthStore.getState();
            authStore.logout();
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    },
);

export { $axios };

