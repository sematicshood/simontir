import api from './api';

const get = async (month: any, year: any, id: any) => {
    return await api.get('/simontir/profile/service-advisor/' + id, {
        params: {
            month, year
        },
    })
}

export default {
    get,
}