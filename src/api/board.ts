import api from './api';

const getSO = async () => {
    return await api.get('/simontir/getso', {})
}

export default {
    getSO,
}