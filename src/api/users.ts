import api from './api';

const users = require('@data/users.json');

const cekUser = (payload) => {
    return new Promise((res, rej) => {
        let user = users.filter(el => {
            return el.login == payload.login && el.password == payload.password
        })
    
        if(user.length > 0) {
            const role = user[0].role

            const data = {
                role: role
            }
        
            localStorage.setItem("login", JSON.stringify(data))

            if(role == 'mekanik') res({ name: 'list_mekanik' })
        }
    
        rej('Username atau password salah')
    })
}

export default {
    cekUser,
}