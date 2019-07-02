import api from './api';

const cekUser = async (data: any = null) => {
    return await api.post('/simontir/login', data);
};

const getAsistenMekanik = async () => {
    return await api.get('/simontir/users/getAsistenMekanik', {});
};

const updateRoleUser = async (data: any) => {
    return await api.post('/simontir/users/updateRoleUser', data)
};

const getUsersCuci = async () => {
    return await api.get('/simontir/users/getUsersCuci', {});
};

const getTotalServiceUser = async (id: number) => {
    return await api.get(`/simontir/users/getTotalService/${id}`, {})
};

export default {
    cekUser,
    getAsistenMekanik,
    updateRoleUser,
    getUsersCuci,
    getTotalServiceUser,
};
