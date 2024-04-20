<template>
    <div class="container">
        <div class="row" v-if="product">
            <div class="col-6">
                <img class="detail-img" :src="product.image" alt="" />
            </div>
            <div class="col-6">
                <h3 class="name">{{ product.name }}</h3>
                <span class="brand"
                    >Thương hiệu:
                    <span>{{ product.category.name }}</span>
                </span>
                <p class="description">
                    {{ product.description }}
                </p>
                <span class="quantity"
                    >Số lượng:
                    <input type="number" v-model="storeProduct.quantity" />
                </span>
                <br />
                <p class="price">
                    Giá:
                    <span>{{ product.price.toLocaleString() }} đ</span>
                </p>
                <button @click="handleAddToCart" class="add-btn">
                    Thêm vào giỏ hàng
                </button>
            </div>
        </div>
        <PopupAddCart :openPopupAddToCart="store.openPopupAddToCart" />
    </div>
</template>

<script>
import { useProductStore } from "@/store/module/user/productStore";
import { useRoute } from "vue-router";
import PopupAddCart from "./PopupAddCart.vue";
import { useStore } from "@/store/index";
import { useCartStore } from "@/store/module/user/cartStore";

export default {
    name: "detail-wrapper",
    components: { PopupAddCart },
    setup() {
        const route = useRoute();
        const storeProduct = useProductStore();
        const store = useStore();
        const storeCart = useCartStore();

        const pramId = parseInt(route.params.id);

        const product = storeProduct.getProductById(pramId);

        const handleAddToCart = () => {
            store.openPopupAddToCart = true;
            setTimeout(() => {
                store.openPopupAddToCart = false;
            }, 2000);
            storeProduct.addToCart(pramId);
            storeCart.getAllCart();
        };

        return {
            storeProduct,
            product,
            store,
            pramId,
            handleAddToCart,
            storeCart,
        };
    },
};
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: 30px auto;
    position: relative;
}
.detail-img {
    width: 100%;
}
.name {
    font-weight: 600;
    margin-bottom: 0;
}
.brand {
    font-size: 14px;
    color: blue;
}
.brand span {
    color: black;
}
.description {
    font-size: 14px;
    margin-top: 10px;
}
.quantity {
    font-size: 16px;
    color: red;
}
.quantity input[type="number"] {
    width: 70px;
    padding: 0 4px;
    margin-left: 10px;
}
.quantity input[type="number"]:focus-visible {
    outline: none;
}
.price {
    margin: 0;
    margin-top: 14px;
}
.price > span {
    color: blue;
}
.add-btn {
    border: none;
    background: blue;
    color: #fff;
    padding: 4px 10px;
    border-radius: 4px;
    margin-top: 20px;
}
.add-btn:hover {
    opacity: 0.7;
}
</style>