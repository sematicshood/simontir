import api from './api';

const searchProduct = async (datas: any) => {
    return await api.get('/simontir/products/search', {
        params: datas
    })
}

const searchNopol = async (datas: any) => {
    return await api.get('/simontir/nopol/search', {
        params: datas
    })
}

export default {
    searchNopol,
    searchProduct,
}