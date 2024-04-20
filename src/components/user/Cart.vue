<template>
    <div class="container">
        <h1>Giỏ hàng</h1>
        <div class="row">
            <div class="col-12">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Tổng tiền</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :key="cart.id" v-for="cart in cartStore.carts">
                            <td>
                                <img
                                    class="cart-img"
                                    :src="cart.product.image"
                                    alt=""
                                />
                            </td>
                            <td>
                                <div class="info">
                                    <p>{{ cart.product.name }}</p>
                                    <span>{{
                                        cart.product.category.name
                                    }}</span>
                                </div>
                            </td>
                            <td>
                                <p class="price">
                                    {{ cart.product.price.toLocaleString() }} đ
                                </p>
                            </td>
                            <td>
                                <div class="quantity-control">
                                    <input
                                        v-model="cart.quantity"
                                        type="number"
                                    />
                                    <button
                                        class="quanty-update"
                                        @click="
                                            handleUpdateCart(
                                                cart.id,
                                                cart.quantity
                                            )
                                        "
                                    >
                                        <font-awesome-icon
                                            :icon="['fas', 'pen-to-square']"
                                        />
                                    </button>
                                </div>
                            </td>
                            <td>{{ cart.price.toLocaleString() }} đ</td>
                            <td class="delete-btn">
                                <button @click="handleDeleteCart(cart.id)">
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <a href="/checkout" class="checkout-link">Thanh toán</a>

                <div
                    v-if="cartStore.openPopupUpdateCart"
                    class="add-cart-popup"
                >
                    <font-awesome-icon
                        class="popup-icon"
                        :icon="['fas', 'check']"
                    />
                    <p>Cập nhật thành công!</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useCartStore } from "@/store/module/user/cartStore";
export default {
    name: "cart-wrapper",
    components: { FontAwesomeIcon },
    setup() {
        const cartStore = useCartStore();

        cartStore.getAllCart();

        const handleUpdateCart = (cartItemId, quantity) => {
            cartStore.openPopupUpdateCart = true;
            setTimeout(() => {
                cartStore.openPopupUpdateCart = false;
            }, 1000);
            cartStore.updateCart(cartItemId, quantity);
        };

        const handleDeleteCart = (cartItemId) => {
            cartStore.deleteCart(cartItemId);
        };

        return { cartStore, handleUpdateCart, handleDeleteCart };
    },
};
</script>

<style scoped>
.container {
    max-width: 900px;
    margin: 30px auto;
}
.cart-img {
    width: 80px;
}
.info {
    display: inline-block;
}
.info > p {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
}
.quantity-control {
    display: inline-flex;
    align-items: center;
    border: 1px solid #333;
}
.quantity-control .quanty-update {
    border: none;
    padding: 2px 6px;
    color: blue;
}
.quantity-control .quanty-update:hover {
    background: gainsboro;
}
.quantity-control .quanty-update:last-child {
    border-left: 1px solid #333;
}
.quantity-control > input[type="number"] {
    border: none;
    width: 50px;
    padding: 0 3px;
}
.quantity-control > input[type="number"]:focus-visible {
    outline: none;
}
.delete-btn > button {
    text-decoration: none;
    color: red;
    border: none;
    background: transparent;
}
.add-cart-popup {
    position: absolute;
    top: 30%;
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
.checkout-link {
    text-decoration: none;
    color: white;
    background: blue;
    padding: 8px 10px;
    border-radius: 2px;
    margin-top: 10px;
    display: inline-block;
}
.checkout-link:hover {
    opacity: 0.7;
}
</style>