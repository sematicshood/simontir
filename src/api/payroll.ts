import api from './api';

const get = async (day: any, month: any, year: any, day_until: any, month_until: any, year_until: any , type: string) => {
    return await api.get('/simontir/payroll', {
        params: {
            day, month, year, day_until, month_until, year_until, type,
        },
    })
};

export default {
    get,
};
