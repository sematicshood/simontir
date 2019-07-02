import api from './api';

const getData = async (date: any) => {
    return await api.get('/simontir/cash_count', {
        params: date,
    });
};

const getTotalSaldo = async (date: any) => {
    return await api.get('/simontir/cash_count/get_total_saldo', {
        params: date,
    });
};

const submitLaporan = async (data: any) => {
    return await api.post('/simontir/cash_count', data);
};

export default {
    getData,
    getTotalSaldo,
    submitLaporan,
}