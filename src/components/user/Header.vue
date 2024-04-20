<template>
    <header :class="storeUser.isRole === 'ROLE_ADMIN' ? 'head' : ''">
        <div class="container">
            <!-- USER -->
            <div v-if="storeUser.isRole === 'ROLE_USER'" class="row">
                <div class="col-4">
                    <a href="/" class="header-left">
                        <img src="@/assets/logo.png" alt="logo" class="logo" />
                        <span>Vue E-Commerce</span>
                    </a>
                </div>
                <div class="col-4">
                    <div class="header-mid">
                        <Search />
                    </div>
                </div>
                <div class="col-4 cart">
                    <a href="/cart" class="header-right">
                        <font-awesome-icon
                            class="cart-icon"
                            :icon="['fas', 'cart-shopping']"
                        />
                        <span>{{ quantyCart !== null ? quantyCart : 0 }}</span>
                    </a>
                </div>
            </div>
            <div v-if="storeUser.isRole === 'ROLE_USER'" class="row">
                <div class="col">
                    <ul class="header-control">
                        <li><router-link to="/">Trang chủ</router-link></li>
                        <li>
                            <router-link to="/cart">Giỏ hàng</router-link>
                        </li>
                        <li>
                            <router-link to="/checkout">Thanh toán</router-link>
                        </li>
                        <li
                            @click="handleLogout"
                            v-if="storeUser.isAuthentication"
                        >
                            <button class="btn-logout">Đăng xuất</button>
                        </li>
                        <div v-else class="account">
                            <li>
                                <router-link to="/login">Đăng nhập</router-link>
                            </li>
                            <li>
                                <router-link to="/signup">Đăng ký</router-link>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>

            <!-- ADMIN -->
            <div v-if="storeUser.isRole === 'ROLE_ADMIN'" class="row">
                <div class="col-2">
                    <router-link to="/admin" class="header-left">
                        <img src="@/assets/logo.png" alt="logo" class="logo" />
                        <span>Vue Admin</span>
                    </router-link>
                </div>
                <div class="col-10">
                    <ul class="header-control">
                        <li>
                            <router-link to="/admin">Trang chủ</router-link>
                        </li>
                        <li>
                            <router-link to="/product-manager">
                                Sản phẩm
                            </router-link>
                        </li>
                        <li
                            @click="handleLogout"
                            v-if="storeUser.isAuthentication"
                        >
                            <button class="btn-logout">Đăng xuất</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useUserStore } from "@/store/module/user/userStore";
import Search from "./Search.vue";
import { useProductStore } from "@/store/module/user/productStore";
import { useStore } from "@/store/index";
import { useCartStore } from "@/store/module/user/cartStore";
import router from "@/router/index";

export default {
    name: "header-wrapper",
    components: { Search, FontAwesomeIcon },
    setup() {
        const store = useStore();

        const storeUser = useUserStore();
        const storeProduct = useProductStore();
        const storeCart = useCartStore();

        const handleLogout = () => {
            storeUser.logout();
            router.push("/");
        };

        const quantyCart = storeCart.getQuantityCart;

        return {
            store,
            storeUser,
            storeProduct,
            handleLogout,
            storeCart,
            quantyCart,
        };
    },
};
</script>

<style scoped>
header {
    color: #fff;
    background-color: #333;
    height: 120px;
}
header.head {
    height: 80px;
}
.container {
    padding-top: 18px;
    height: 100%;
    max-width: 1200px;
}
.container .row {
    align-items: center;
}
.header-left {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    color: #fff;
    text-decoration: none;
}
.header-left .logo {
    width: 40px;
}
.header-mid {
    display: flex;
    align-items: center;
    position: relative;
}

.cart {
    text-align: center;
}
.header-right {
    position: relative;
    display: inline-block;
    list-style: none;
    margin: 0;
    color: #fff;
    text-decoration: none;
}
.header-right .cart-icon {
    font-size: 24px;
}
.header-right span {
    position: absolute;
    top: -12px;
    background: #fff;
    color: blue;
    padding: 2px 6px;
    border-radius: 50%;
    right: -10px;
    font-size: 12px;
}
.header-control {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 8px 0 0 0;
    padding: 0 70px 0 0;
    height: 40px;
}
.header-control > li {
    margin: 0 30px;
}
.header-control > li > a {
    text-decoration: none;
    color: #fff;
}
.header-control > li > a:hover {
    color: blue;
}
.account {
    display: flex;
    align-items: center;
}
.account > li > a {
    text-decoration: none;
    color: #fff;
}
.account > li:first-child {
    margin-left: 15px;
}
.account > li:last-child {
    margin-left: 40px;
}
.btn-logout {
    border: none;
    background: transparent;
    color: white;
}
</style>