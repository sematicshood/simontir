import Vue from 'vue';
import Router from 'vue-router';
import auth from './helpers/auth';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      component: () => import('./views/404.vue'),
    },
    {
      path: '/',
      component: () => import('./views/QueueBoard.vue'),
      meta: {
        title: 'Queue Board',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: {
        title: 'Login',
      },
    },
    {
      path: '/profii',
      name: 'profil',
      component: () => import('./views/Profil.vue'),
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
      component: () => import('./views/Register.vue'),
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
      component: () => import('./views/TabelRegistrasi.vue'),
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
      component: () => import('./views/FinalCheck.vue'),
      meta: {
        requiresAuth: true,
        role: ['kepala mekanik', 'asisten mekanik'],
        title: 'Final Check',
      },
    },
    {
      path: '/list_final_check',
      name: 'list_final_check',
      component: () => import('./views/ListFinalCheck.vue'),
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
      component: () => import('./views/ListMekanik.vue'),
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
      component: () => import('./views/OptionRole.vue'),
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
      component: () => import('./views/TimesheetMekanik.vue'),
      meta: {
        requiresAuth: true,
        role: ['mekanik'],
        title: 'Timesheet Mekanik',
      },
    },
    {
      path: '/queue_board',
      name: 'queue_board',
      component: () => import('./views/QueueBoard.vue'),
      meta: {
        title: 'Queue Board',
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const login: any = JSON.parse(localStorage.getItem('login')!);

  document.title = 'Simontir - ' + to.meta.title;

  if (to.name === 'login' && login) {
    next({ name: auth.cekRoleUrl(login.role) });
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (login) {
      if (login.role.toUpperCase() !== 'manager'.toUpperCase()) {
        const role: string[]  = to.meta.role.map((x: string) => {
                                  return x.toUpperCase();
                                });
        const nowRole: string   = login.role.toUpperCase();

        if (role.includes(nowRole) === false) { next({ name: auth.cekRoleUrl(nowRole) }); }
      }
    } else {
      next({ name: 'login' });
    }
  }

  next();
});

export default router;
