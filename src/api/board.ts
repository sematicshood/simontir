import api from './api';

const getSO = async () => {
    return await api.get('/simontir/getso', {})
}

const getTask = async (no_ref) => {
    return await api.get(`/simontir/get_task/${ no_ref }`)
}

export default {
    getSO,
    getTask,
}