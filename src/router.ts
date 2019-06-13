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
      path: '/board-mekanik',
      name: 'board-mekanik',
      component: () => import('./views/BoardMekanik.vue'),
      meta: {
        title: 'Board Mekanik',
        requiresAuth: true,
        role: ['mekanik'],
        show: true,
      },
    },
    {
      path: '/list-unit-entri',
      name: 'list-unit-entri',
      component: () => import('./views/ListUnitEntri.vue'),
      meta: {
        title: 'List Unit Entri',
        requiresAuth: true,
        role: ['mekanik'],
        show: true,
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
      path: '/profil',
      name: 'profil',
      component: () => import('./views/Profil.vue'),
      meta: {
        requiresAuth: true,
        role: ['staff', 'kepala mekanik', 'ass mekanik', 'mekanik'],
        title: 'Profil',
        show: true,
      },
    },
    {
      path: '/wablaster',
      name: 'wablaster',
      component: () => import('./views/File.vue'),
      meta: {
        requiresAuth: true,
        role: ['staff'],
        title: 'WA Blaster Template',
        show: true,
      },
    },
    {
      path: '/laporan/harian',
      name: 'laporan_harian',
      component: () => import('./views/LaporanHarian.vue'),
      meta: {
        requiresAuth: true,
        role: ['staff'],
        title: 'Laporan Harian',
        show: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
      meta: {
        requiresAuth: true,
        role: ['staff'],
        title: 'Register',
        show: true,
      },
    },
    {
      path: '/register/edit/:so',
      name: 'edit register',
      component: () => import('./views/Register.vue'),
      meta: {
        requiresAuth: true,
        role: ['staff'],
        title: 'Edit Register',
      },
    },
    {
      path: '/data_registrasi',
      name: 'data_registrasi',
      component: () => import('./views/TabelRegistrasi.vue'),
      meta: {
        requiresAuth: true,
        role: ['staff'],
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
        role: ['kepala mekanik'],
        title: 'Final Check',
      },
    },
    {
      path: '/list_final_check',
      name: 'list_final_check',
      component: () => import('./views/ListFinalCheck.vue'),
      meta: {
        requiresAuth: true,
        role: ['kepala mekanik'],
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
        role: ['ass mekanik', 'mekanik'],
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
      path: '/list_cuci',
      name: 'list_cuci',
      component: () => import('./views/ListCuci.vue'),
      meta: {
        requiresAuth: true,
        role: ['ass mekanik', 'cuci'],
        title: 'Daftar Cuci',
        show: true,
      },
    },
    {
      path: '/timesheet_mekanik/:id',
      name: 'timesheet_mekanik',
      component: () => import('./views/TimesheetMekanik.vue'),
      meta: {
        requiresAuth: true,
        role: ['mekanik', 'ass mekanik'],
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
    next({ name: auth.cekRoleUrl(login.job) });
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (login) {
      if (login.job.toUpperCase() !== 'Owner'.toUpperCase()) {
        const role: string[] = to.meta.role.map((x: string) => {
          return x.toUpperCase();
        });
        const nowRole: string = login.job.toUpperCase();

        if (role.includes(nowRole) === false) { next({ name: auth.cekRoleUrl(nowRole) }); }
      }
    } else {
      next({ name: 'login' });
    }
  }

  next();
});

export default router;
