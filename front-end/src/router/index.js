import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import UserRegister from '../components/UserRegister.vue';
import UserResetPassword from '../components/UserResetPassword.vue';
import UserProduct from '../components/product/UserProduct.vue';
import AdminDashboard from '../components/admin/AdminDashboard.vue';
import AdminLogin from '../components/admin/AdminLogin.vue';
import UserLayout from '../layouts/UserLayout.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import UploadProduct from '../components/admin/UploadProduct.vue';

const routes = [
  {
    path: '/',
    component: UserLayout,
    children: [
      {
        path: '',
        name: 'UserHome',
        component: UserProduct,
      },
      {
        path: 'login',
        name: 'UserLogin',
        component: UserLogin,
      },
      {
        path: 'register',
        name: 'UserRegister',
        component: UserRegister,
      },
      {
        path: 'reset-password',
        name: 'UserResetPassword',
        component: UserResetPassword,
      },
      {
        path: 'product',
        name: 'UserProduct',
        component: UserProduct,
      },
    ],
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: 'login',
        name: 'AdminLogin',
        component: AdminLogin,
      },
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: { requiresAuth: true },
      },
      {
        path: 'upload-product',
        name: 'UploadProduct',
        component: UploadProduct,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard เพื่อป้องกันการเข้าถึงหน้าแอดมินโดยไม่เข้าสู่ระบบ
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next({ name: 'AdminLogin' });
  } else {
    next();
  }
});

export default router;
