import api from "./api";

const revenue = async () => {
    return await api.get('/simontir/profile/owner/revenue')
};

const sales = async (month: any, year: any) => {
    return await api.get('/simontir/profile/owner/sales', {
        params: {
            month, year
        },
    })
}

const topRevenue = async (month: any, year: any) => {
    return await api.get('/simontir/profile/owner/product-revenue', {
        params: {
            month, year
        },
    })
}

const newReturnCustomer = async (month: any, year: any) => {
    return await api.get('/simontir/profile/owner/new-return-customer', {
        params: {
            month, year
        },
    })
}

const rasio = async (month: any, year: any) => {
    return await api.get('/simontir/profile/owner/rasio', {
        params: {
            month, year
        },
    })
}

const service = async (month: any, year: any) => {
    return await api.get('/simontir/profile/owner/service', {
        params: {
            month, year
        },
    })
}

const staffMekanik = async (month: any, year: any) => {
    return await api.get('/simontir/profile/owner/staff-mekanik', {
        params: {
            month, year
        },
    })
}

export default {
    revenue,
    sales,
    topRevenue,
    newReturnCustomer,
    rasio,
    service,
    staffMekanik
}