import api from './api';

const getSO = async () => {
    return await api.get('/simontir/getso', {});
};

const getTask = async (noRef: any) => {
    return await api.get(`/simontir/get_task/${ noRef }`);
};

const getCuci = async () => {
    return await api.get(`/simontir/get_cuci`);
};

export default {
    getSO,
    getTask,
    getCuci,
};
