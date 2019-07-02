import Vue from 'vue';
import Toasted from 'vue-toasted';

Vue.use(Toasted, {
    singleton: true,
    theme: 'bubble',
    position: 'top-center',
});