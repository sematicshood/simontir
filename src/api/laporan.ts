import api from "./api";

const getReportToday = async (date: any) => {
    return await api.get('/simontir/laporan_harian', {
        params: date,
    })
};

export default {
    getReportToday,
}