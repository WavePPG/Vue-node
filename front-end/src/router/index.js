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
import UserProfile from '../components/UserProfile.vue';
import UserProductDetail from '../components/product/UserProductDetail.vue';
import ProductHome from '@/components/product/ProductHome.vue';
import UserCart from '../components/UserCart.vue'; // Import UserCart component
import CheckOut from '../components/CheckOut.vue'; // Import CheckOut component
import HistoryUser from '../components/HistoryUser.vue'; // Import History component
import AdminOrders from '../components/admin/AdminOrders.vue'; // Import AdminOrders component

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
      {
        path: 'product/:id',
        name: 'UserProductDetail',
        component: UserProductDetail,
        props: true, // ให้ส่งเฉพาะ id เป็น props
      },      
      {
        path: 'home',
        name: 'ProductHome',
        component: ProductHome,
      },
      {
        path: 'profile',
        name: 'UserProfile',
        component: UserProfile,
        meta: { requiresAuth: true },
      },
      {
        path: 'cart',
        name: 'UserCart',
        component: UserCart,
        meta: { requiresAuth: true },
      },
      {
        path: 'checkout',
        name: 'CheckOut',
        component: CheckOut,
        meta: { requiresAuth: true },
      },
      {
        path: 'history',
        name: 'HistoryUser',
        component: HistoryUser,
        meta: { requiresAuth: true },
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
        meta: { hideSidebar: true },
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
      {
        path: 'orders',
        name: 'AdminOrders',
        component: AdminOrders,
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

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next({ name: 'UserLogin' });
  } else {
    next();
  }
});

export default router;
