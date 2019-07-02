import api from './api';

const cekSO = async () => {
    return await api.get('/simontir/cekso', {});
};

const cekNopol = async (data: any) => {
    return await api.get('/simontir/ceknopol', {
        params: data,
    });
};

const createRegister = async (data: any) => {
    return await api.post('/simontir/createRegister', data);
};

const getDetailSo = async (so: string) => {
    return await api.get(`/simontir/print-so/${ so }`);
}

export default {
    cekSO,
    cekNopol,
    createRegister,
    getDetailSo,
};
