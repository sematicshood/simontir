import api from './api';

const mekaniks = async (day: any, month: any, year: any) => {
    return await api.get('/simontir/board-mekanik', {
        params: {
            month, year, day
        },
    })
}

export default {
    mekaniks,
}