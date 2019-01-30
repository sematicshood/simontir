import api from './api';

const getSO = async () => {
    return await api.get('/simontir/getso_mekanik', {})
}

const pick = async (data) => {
    return await api.post('/simontir/pick_so', data)
}

export default {
    getSO,
    pick
}