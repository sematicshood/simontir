import api from './api';

const get = async () => {
    return await api.get('/simontir/job');
};

const post = async (data: any) => {
    return await api.post('/simontir/job/create', data);
};

const detail = async (job_id: any) => {
    return await api.get(`/simontir/job/${ job_id }/menus`);
};

export default {
    get,
    post,
    detail
};