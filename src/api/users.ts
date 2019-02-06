import api from './api';
import qs from 'qs';

const cekUser = async (data: any = null) => {
    return await api.post('/simontir/login', data);
};

export default {
    cekUser,
};
