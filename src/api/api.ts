import axios from 'axios'

let axiosOptions    =   {}

if(process.env.VUE_APP_BASE_URL) axiosOptions['baseURL'] = process.env.VUE_APP_BASE_URL;

const api = axios.create(axiosOptions);

export default api;
