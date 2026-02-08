import axios from "axios";

export const apiClient = axios.create({
    baseURL:'https://69844e24885008c00db0ad59.mockapi.io',
    headers:{
        'Content-Type':'application/json'
    }
})

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if(token){
        config.headers.Authorization = `Bearer ${token}`  
    }

    return config
})