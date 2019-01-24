const cekRoleUrl = (role) => {
    if(role == 'mekanik') {
        return 'list_mekanik'
    }

    if(role == 'kepala mekanik') {
        return 'list_final_check'
    }

    if(role == 'asisten mekanik') {
        return 'list_final_check'
    }

    if(role == 'front desk') {
        return 'register'
    }
}

export default {
    cekRoleUrl,
}