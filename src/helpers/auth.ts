const cekRoleUrl = (role: string) => {
    if (role.toUpperCase() == 'mekanik'.toUpperCase()) {
        return 'list_mekanik';
    }

    if (role.toUpperCase() == 'kepala mekanik'.toUpperCase()) {
        return 'list_final_check';
    }

    if (role.toUpperCase() == 'ass mekanik'.toUpperCase()) {
        return 'profil';
    }

    if (role.toUpperCase() == 'staff'.toUpperCase()) {
        return 'register';
    }

    return 'register';
};

export default {
    cekRoleUrl,
};
