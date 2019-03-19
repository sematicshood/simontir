import Vue from 'vue';
import Toasted from 'vue-toasted';

Vue.use(Toasted, {
    singleton: true,
    theme: 'bubble',
    position: 'top-center',
});

const error: any = {
    type: 'error',
    duration: 3000,
};

const info: any = {
    type: 'info',
};

const success: any = {
    type: 'success',
    duration: 3000,
};

Vue.toasted.register('error', (payload) => {
    if(!payload.message) {
        return 'Oops.. Something Went Wrong..';
    }

    return 'Oops.. ' + payload.message;
}, error);

Vue.toasted.register('success', (payload) => {
    if(!payload.message) {
        return 'Sukses';
    }

    return payload.message;
}, success);

Vue.toasted.register('info', (payload) => {
    if(!payload.message) {
        return 'Loading...';
    }

    return payload.message;
}, info);