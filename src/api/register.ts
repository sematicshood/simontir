import api from './api';

const cekSO = async () => {
    return await api.get('/simontir/cekso', {})
}

const cekNopol = async (data) => {
    return await api.get('/simontir/ceknopol', {
        params: data
    })
}

const createRegister = async (data) => {
    return await api.post('/simontir/createRegister', data)
}

export default {
    cekSO,
    cekNopol,
    createRegister
}