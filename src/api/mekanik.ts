import api from './api';

const getSO = async (userId: number, date: any) => {
    return await api.get('/simontir/getso_mekanik/' + userId, {
        params: {
            date,
        },
    });
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

const getFinalSO = async (noRef: any) => {
    return await api.get('/simontir/get_final_detail/' + noRef, {});
};

const countTotalFinal = async (id: any) => {
    return await api.get('/simontir/count_final/' + id, {})
}

const pickFinal = async (data: any) => {
    return await api.post('/simontir/pick_final', data)
}

const getLastSO = async (date: any) => {
    return await api.get('/simontir/getso_finalcheck', {
        params: {
            date,
        },
    });
};

const accept = async (data: any) => {
    return await api.post('/simontir/accept', data);
};

const reject = async (data: any) => {
    return await api.post('/simontir/reject', data);
};

const finishFinal = async (data: any) => {
    return await api.post('/simontir/finish_final', data);
};

const getusers = async () => {
    return await api.get('/simontir/getusers', {});
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
    finishFinal,
    getusers,
    countTotalFinal,
    pickFinal
};
