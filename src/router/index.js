import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ProductView from '../views/ProductView.vue';
import GuitarsView from '../views/GuitarsView.vue';
import AccessoriesView from '../views/AccessoriesView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import ManageAccountView from '../views/ManageAccountView.vue';
import WrongWay from '../views/elem/UnauthorizedPage.vue';
import SearchView from '../views/SearchView.vue';

const routes = [
  
  { path: '/home', component: HomeView },
  { path: '/guitars', component: GuitarsView },
  { path: '/accessories', component: AccessoriesView },
  { path: '/product/:id', component: ProductView },
  { path: '/checkout', component: CheckoutView },
  { path: '/about', component: AboutView },
  { path: '/manageAccount', component: ManageAccountView },
  { path: '/wrongway', component: WrongWay },
  {
    path: '/product/guitar/:id', 
    name: 'GuitarProduct', 
    component: ProductView, 
  },
  {
    path: '/product/accessory/:id', 
    name: 'AccessoryProduct', 
    component: ProductView, 
  },
  { path: '/search/:query', component: SearchView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;