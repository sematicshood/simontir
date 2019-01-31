import api from './api';

const getSO = async () => {
    return await api.get('/simontir/getso_mekanik', {})
}

const pick = async (data) => {
    return await api.post('/simontir/pick_so', data)
}

const lock = async (data) => {
    return await api.post('/simontir/lock_so', data)
}

const unlock = async (data) => {
    return await api.post('/simontir/unlock_so', data)
}

export default {
    getSO,
    pick,
    lock,
    unlock,
}