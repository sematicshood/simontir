import api from './api';

const getSO = async () => {
    return await api.get('/simontir/getso', {});
};

const getTask = async (noRef: any) => {
    return await api.get(`/simontir/get_task/${ noRef }`);
};

const getCuci = async (userId: number) => {
    return await api.get(`/simontir/get_cuci/${userId}`);
};

const finishTask = async (data: any) => {
    return await api.post('/simontir/task/finish', data);
};

const unfinishTask = async (data: number) => {
    return await api.post('/simontir/task/unfinish', data);
};

const cekNoMesin = async (data: any) => {
    return await api.post('/simontir/cekNoMesin', data);
};

export default {
    getSO,
    getTask,
    getCuci,
    finishTask,
    unfinishTask,
    cekNoMesin
};
