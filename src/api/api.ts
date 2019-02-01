import axios from 'axios';

const axiosOptions: any    =   {
    withCredentials: false,
};

if (process.env.VUE_APP_BASE_URL) { axiosOptions.baseURL = process.env.VUE_APP_BASE_URL; }

axiosOptions.headers = {
    'Content-Type': 'application/json',
    'CLIENT_API': process.env.VUE_APP_CLIENT_API,
    'CLIENT_SECRET': process.env.VUE_APP_CLIENT_SECRET,
};

const api = axios.create(axiosOptions);

export default api;
