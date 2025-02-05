import { config } from "@/config/config";
import storage from 'redux-persist/lib/storage'
import axios from "axios";
import toast from "react-hot-toast";


 const API_URL = config.app.BASE_URL;

 const api = axios.create({
    baseURL: `${API_URL}/api`,
    withCredentials: true,
 })


 api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
 );


 api.interceptors.response.use(
    (response) => {
        console.log('response', response)
        return response;
    },
    async(error) => {
        console.log('Interceptor error', error)

        if(error.response.status === 401) {
            const errorMessage = error.response.data.message;
            if(errorMessage === 'accessToken expired'){
                console.log('access token expired, logging out...')
                clearAuthPersistData();
                toast.error('Session ended, Please login.')
                window.location.href = '/login'
            }
        }

        return Promise.reject(error)
    }
 )


 const clearAuthPersistData = () => {
    try {
        storage.removeItem('persist:user')
        console.log('Persisted auth data cleared')
    } catch (error) {
        console.error('Error clearing persisted auth data',error)
    }
 }

 export default api;