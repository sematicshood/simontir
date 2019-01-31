import api from './api';

const cekUser = async (data = null) => {
    return await api.post('/simontir/login', data)
}

export default {
    cekUser,
}