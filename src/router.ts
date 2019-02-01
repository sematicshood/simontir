import Vue from 'vue';
import Router from 'vue-router';
import auth from './helpers/auth';

import Queue from './views/QueueBoard.vue';
import Login from './views/Login.vue';
import Profile from './views/Profil.vue';
import Register from './views/Register.vue';
import DataRegistrasi from './views/TabelRegistrasi.vue';
import FinalCheck from './views/FinalCheck.vue';
import ListFinalCheck from './views/ListFinalCheck.vue';
import ListMekanik from './views/ListMekanik.vue';
import OptionRole from './views/OptionRole.vue';
import TimesheetMekanik from './views/TimesheetMekanik.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      component: require('@views/404.vue'),
    },
    {
      path: '/',
      component: Queue,
      meta: {
        title: 'Queue Board',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: 'Login',
      },
    },
    {
      path: '/profii',
      name: 'profil',
      component: Profile,
      meta: {
        requiresAuth: true,
        role: ['front desk', 'kepala mekanik', 'asisten mekanik', 'mekanik'],
        title: 'Profil',
        show: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresAuth: true,
        role: ['front desk'],
        title: 'Register',
        show: true,
      },
    },
    {
      path: '/data_registrasi',
      name: 'data_registrasi',
      component: DataRegistrasi,
      meta: {
        requiresAuth: true,
        role: ['front desk'],
        title: 'Data Registrasi',
        show: true,
      },
    },
    {
      path: '/final_check/:id',
      name: 'final_check',
      component: FinalCheck,
      meta: {
        requiresAuth: true,
        role: ['kepala mekanik', 'asisten mekanik'],
        title: 'Final Check',
      },
    },
    {
      path: '/list_final_check',
      name: 'list_final_check',
      component: ListFinalCheck,
      meta: {
        requiresAuth: true,
        role: ['kepala mekanik', 'asisten mekanik'],
        title: 'List Final Check',
        show: true,
      },
    },
    {
      path: '/list_mekanik',
      name: 'list_mekanik',
      component: ListMekanik,
      meta: {
        requiresAuth: true,
        role: ['mekanik'],
        title: 'List Mekanik',
        show: true,
      },
    },
    {
      path: '/option_role',
      name: 'option_role',
      component: OptionRole,
      meta: {
        requiresAuth: true,
        role: ['kepala mekanik'],
        title: 'Option Role',
        show: true,
      },
    },
    {
      path: '/timesheet_mekanik/:id',
      name: 'timesheet_mekanik',
      component: TimesheetMekanik,
      meta: {
        requiresAuth: true,
        role: ['mekanik'],
        title: 'Timesheet Mekanik',
      },
    },
    {
      path: '/queue_board',
      name: 'queue_board',
      component: Queue,
      meta: {
        title: 'Queue Board',
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const login: any = JSON.parse(localStorage.getItem('login')!);

  document.title = 'Simontir - ' + to.meta.title;

  if (to.name == 'login' && login) {
    next({ name: auth.cekRoleUrl(login.role) });
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (login) {
      if (login.role.toUpperCase() != 'manager'.toUpperCase()) {
        const   role: string[]  = to.meta.role.map(function(x: string) { return x.toUpperCase(); }),
              lrole: string   = login.role.toUpperCase();

        if (role.includes(lrole) == false) { next({ name: auth.cekRoleUrl(lrole) }); }
      }
    } else {
      next({ name: 'login' });
    }
  }

  next();
});

export default router;
