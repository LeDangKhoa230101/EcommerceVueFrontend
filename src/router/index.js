import { createRouter, createWebHistory } from 'vue-router';

// USER
import Home from '../components/user/Home.vue'
import Detail from '../components/user/Detail.vue'
import Cart from '../components/user/Cart.vue'
import Checkout from '../components/user/Checkout.vue'
import Login from '../components/user/Login.vue'
import Register from '../components/user/Register.vue'

// ADMIN
import Admin from '../components/admin/Admin.vue'
import ProductManager from '../components/admin/product/ProductManager.vue'
import UpdateProduct from '../components/admin/product/UpdateProduct.vue'
import AddProduct from '../components/admin/product/AddProduct.vue'

const routes = [
    // USER
    { path: '/', component: Home },
    { path: '/product/:id', component: Detail, name: 'productDetail' },
    { path: '/cart', component: Cart },
    { path: '/checkout', component: Checkout },
    { path: '/login', component: Login },
    { path: '/signup', component: Register },
    // ADMIN
    { path: '/admin', component: Admin },
    { path: '/product-manager', component: ProductManager },
    { path: '/product-manager/add', component: AddProduct },
    { path: '/product-manager/:productId', component: UpdateProduct, name: 'updateDetail' },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router