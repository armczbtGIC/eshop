import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ProductsView from '../views/ProductsView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import ManageAccountView from '../views/ManageAccountView.vue';
import WrongWay from '../views/elem/UnauthorizedPage.vue';

const routes = [
  
  { path: '/home', component: HomeView },
  { path: '/products', component: ProductsView },
  { path: '/checkout', component: CheckoutView },
  { path: '/about', component: AboutView },
  { path: '/manageAccount', component: ManageAccountView },
  { path: '/wrongway', component: WrongWay },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;