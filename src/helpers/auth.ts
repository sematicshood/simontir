import users from '../api/users';
import api from '../api/api';

const cekRoleUrl = (role) => {
    if(role.toUpperCase() == 'mekanik'.toUpperCase()) {
        return 'list_mekanik'
    }

    if(role.toUpperCase() == 'kepala mekanik'.toUpperCase()) {
        return 'list_final_check'
    }

    if(role.toUpperCase() == 'asisten mekanik'.toUpperCase()) {
        return 'list_final_check'
    }

    if(role.toUpperCase() == 'front desk'.toUpperCase()) {
        return 'register'
    }

    return 'register'
}

const cekData = () => {
    let usersLocal = JSON.parse(localStorage.getItem('users'))
    
    if(usersLocal == null) {
        let getUser = api.get('https://api.myjson.com/bins/1fxjqs')

        getUser.then(res => localStorage.setItem('users', JSON.stringify(res.data)))
    }
}

export default {
    cekRoleUrl,
    cekData,
}