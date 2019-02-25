const cekRoleUrl = (role: string) => {
    console.log(role)
    if (role.toUpperCase() == 'mekanik'.toUpperCase()) {
        return 'list_mekanik';
    }

    if (role.toUpperCase() == 'kepala mekanik'.toUpperCase()) {
        return 'list_final_check';
    }

    if (role.toUpperCase() == 'ass mekanik'.toUpperCase()) {
        return 'profil';
    }

    if (role.toUpperCase() == 'staf'.toUpperCase()) {
        return 'register';
    }

    return 'register';
};

export default {
    cekRoleUrl,
};
