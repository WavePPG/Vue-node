import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import UserRegister from '../components/UserRegister.vue';
import UserResetPassword from '../components/UserResetPassword.vue';
import UserProduct from '@/components/product/UserProduct.vue';


const routes = [
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin,
  },
  {
    path: '/register',
    name: 'UserRegister',
    component: UserRegister,
  },
  {
    path: '/reset-password',
    name: 'UserResetPassword',
    component: UserResetPassword,
  },
  {
    path: '/product',
    name: 'UserProduct',
    component: UserProduct,
    beforeEnter: (to, from, next) => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.role === 'member') {
        next();
      } else {
        next({ name: 'UserLogin' });
      }
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
