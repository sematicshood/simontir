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

const finishTask = async (id: number) => {
    return await api.post('/simontir/task/finish', { id: id });
};

const unfinishTask = async (id: number) => {
    return await api.post('/simontir/task/unfinish', { id: id });
};

export default {
    getSO,
    getTask,
    getCuci,
    finishTask,
    unfinishTask,
};
