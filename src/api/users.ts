import api from './api';

const cekUser = async (payload) => {
    return await api.get('https://api.myjson.com/bins/1fxjqs')
}

export default {
    cekUser,
}