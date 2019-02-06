import axios from 'axios';

const axiosOptions: any    =   {
    withCredentials: false,
};

if (process.env.VUE_APP_BASE_URL) { axiosOptions.baseURL = process.env.VUE_APP_BASE_URL; }

//axiosOptions.headers = {
//    'Access-Control-Allow-Origin': '*',
//    "Access-Control-Allow-Credentials": "true",
//    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
//    "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
//    'Content-Type': 'application/json',
//    'CLIENT_API': process.env.VUE_APP_CLIENT_API,
//    'CLIENT_SECRET': process.env.VUE_APP_CLIENT_SECRET,
//};

const api = axios.create(axiosOptions);

export default api;

