import api from './api';

const getMonth = async (month: any, year: any, user_id: any, type: string) => {
    return await api.get('/simontir/unit_entri/month', {
        params: {
            month, year, user_id, type,
        },
    })
};

const getDay = async (day: any, month: any, year: any, user_id: any, type: string) => {
    return await api.get('/simontir/unit_entri/day', {
        params: {
            day, month, year, user_id, type,
        },
    })
};

export default {
    getMonth,
    getDay
};