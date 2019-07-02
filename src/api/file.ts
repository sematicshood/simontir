import api from './api';

const exportTemplateWABlaster = async (params: any) => {
    return await api.get('/simontir/file/waBlaster', {
        params,
    })
}

export default {
    exportTemplateWABlaster,
}