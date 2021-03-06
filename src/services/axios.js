import axios from 'axios';
import LocalStorage from './localStorage';

const localStorageService = LocalStorage.getService();

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorageService.getIdToken();
        if (token){
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error);
    });

axiosInstance.interceptors.response.use((response) => {
    return response
}, function(error){
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;
        const refreshToken = localStorageService.getRefreshToken();

        return axiosInstance.post(process.env.REACT_APP_API+'refreshToken',
            {
                "refreshToken": refreshToken
            }).then(res => {
                if (res.status === 201) {
                    localStorageService.setIdToken(res.data.IdToken);
                    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getIdToken();
                    return axiosInstance(originalRequest)
                }
            })
    }
    return Promise.reject(error);
});
export default axiosInstance;
