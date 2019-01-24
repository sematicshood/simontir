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

export default {
    cekRoleUrl,
}