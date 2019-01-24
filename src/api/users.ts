import api from './api';

const cekUser = (payload = null) => {
    // return await api.get('https://api.myjson.com/bins/1fxjqs')
    return JSON.parse(localStorage.getItem('users'))
}

export default {
    cekUser,
}