import api from './api';

const getSO = async () => {
    return await api.get('/simontir/getso_mekanik', {});
};

const pick = async (data: any) => {
    return await api.post('/simontir/pick_so', data);
};

const lock = async (data: any) => {
    return await api.post('/simontir/lock_so', data);
};

const unlock = async (data: any) => {
    return await api.post('/simontir/unlock_so', data);
};

const getFinalSO = async (no_ref: any) => {
    return await api.get('/simontir/get_final_detail/' + no_ref, {});
};

const getLastSO = async () => {
    return await api.get('/simontir/getso_finalcheck', {});
};

const accept = async (data: any) => {
    return await api.post('/simontir/accept', data);
};

const reject = async (data: any) => {
    return await api.post('/simontir/reject', data);
};

export default {
    getSO,
    pick,
    lock,
    unlock,
    getFinalSO,
    accept,
    getLastSO,
    reject,
};