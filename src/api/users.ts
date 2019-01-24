import api from './api';

const users = require('@data/users.json');

const cekUser = () => {
    return users;
}

export default {
    cekUser,
}