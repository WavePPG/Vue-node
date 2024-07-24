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
import UserProfile from '../components/UserProfile.vue'; // Import UserProfile component
import UserProductDetail from '../components/product/UserProductDetail.vue';
import ProductHome from '@/components/product/ProductHome.vue';

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
        path: 'product/:id', // Add route for product details
        name: 'UserProductDetail',
        component: UserProductDetail,
        props: true, // Allow route params to be passed as props
      },
      {
        path: 'home', // Add route for product details
        name: 'ProductHome',
        component: ProductHome,
      },
      {
        path: 'profile',
        name: 'UserProfile',
        component: UserProfile, // Add UserProfile route
        meta: { requiresAuth: true }, // Add requiresAuth meta field
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
        meta: { hideSidebar: true }, // Meta field to conditionally hide sidebar
      },
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: { requiresAuth: true }, // Meta field for authentication guard
      },
      {
        path: 'upload-product',
        name: 'UploadProduct',
        component: UploadProduct,
        meta: { requiresAuth: true }, // Meta field for authentication guard
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*', // Handle unmatched routes
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to prevent access to admin pages without logging in
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next({ name: 'AdminLogin' });
  } else {
    next();
  }
});

export default router;
