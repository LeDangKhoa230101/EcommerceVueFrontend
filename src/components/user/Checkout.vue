<template>
    <div class="container">
        <h1>Thanh toán</h1>
        <div class="row">
            <div class="col-6">
                <form @submit.prevent="handleCheckout">
                    <div class="form-group">
                        <label>Số điện thoại</label>
                        <input
                            v-model="storeCart.numberPhone"
                            type="tel"
                            class="form-control"
                        />
                    </div>
                    <div class="form-group">
                        <label>Địa chỉ</label>
                        <input
                            v-model="storeCart.address"
                            type="text"
                            class="form-control"
                        />
                    </div>
                    <div class="form-group">
                        <label>Note</label>
                        <textarea
                            v-model="storeCart.note"
                            class="form-control"
                            cols="5"
                            rows="3"
                        />
                    </div>
                    <button type="submit" class="btn btn-primary">
                        Thanh toán
                    </button>
                </form>
            </div>
            <div class="col-6">
                <div class="">
                    <ul
                        class="list-cart"
                        :key="cart.id"
                        v-for="cart in storeCart.carts"
                    >
                        <li>
                            <img :src="cart.product.image" alt="" />
                            <div class="body">
                                <span>{{ cart.product.name }}</span>
                                <p>{{ cart.quantity }}x</p>
                            </div>
                            <span class="price"
                                >{{ cart.price.toLocaleString() }}đ</span
                            >
                        </li>
                    </ul>
                </div>
            </div>

            <div v-if="storeCart.openPopupCheckout" class="add-cart-popup">
                <font-awesome-icon
                    class="popup-icon"
                    :icon="['fas', 'check']"
                />
                <p>Mua hàng thành công!</p>
            </div>
        </div>
    </div>
</template>

<script>
import { useCartStore } from "@/store/module/user/cartStore";
import router from "@/router/index";
export default {
    name: "checkout-wrapper",
    setup() {
        const storeCart = useCartStore();

        storeCart.getAllCart();

        const handleCheckout = () => {
            if (
                storeCart.numberPhone !== "" &&
                storeCart.address !== "" &&
                storeCart.note !== ""
            ) {
                storeCart.openPopupCheckout = true;
                storeCart.checkout();
                setTimeout(() => {
                    storeCart.openPopupCheckout = false;
                    router.replace("/cart");
                }, 2000);
            }
        };

        return { storeCart, handleCheckout };
    },
};
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: 30px auto;
}
.form-group {
    margin-bottom: 10px;
}
.form-group label {
    margin-left: 2px;
}
.list-cart {
    list-style: none;
    margin: 0;
    padding: 25px 0 0 0;
}
.list-cart li {
    display: flex;
    align-items: center;
    background: white;
    padding: 4px 10px;
    border-bottom: 1px solid #f5f5f5;
}
.list-cart li .body {
    display: flex;
    flex-direction: column;
    margin: 0 10px;
}
.list-cart li .body span {
    font-size: 16px;
    font-weight: 600;
    overflow: hidden;
    line-height: 24px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    margin-bottom: 10px;
}
.list-cart li .body p {
    margin: 0;
    color: red;
}
.list-cart li img {
    width: 60px;
}
.list-cart li .price {
    color: blue;
}
.add-cart-popup {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 270px;
    height: 130px;
    color: white;
    padding: 0 12px;
}
.popup-icon {
    font-size: 26px;
    background-color: aqua;
    padding: 4px;
    border-radius: 10px;
    color: red;
}
.add-cart-popup p {
    margin: 0;
    margin-left: 10px;
}
</style>