import api from './api';

const getTypeVehicle = async () => {
    return await api.get('/simontir/kendaraan/getType', {});
};

export default {
    getTypeVehicle,
}