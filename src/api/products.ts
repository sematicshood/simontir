import api from './api';

const searchProduct = async (datas: any) => {
    return await api.get('/simontir/products/search', {
        params: datas
    })
}

export default {
    searchProduct,
}