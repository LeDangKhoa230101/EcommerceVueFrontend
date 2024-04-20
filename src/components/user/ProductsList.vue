<template>
    <div class="container">
        <h1>Danh sách sản phẩm</h1>
        <div class="row">
            <ProductItem
                :prod="prod"
                v-for="prod in store.products"
                :key="prod.id"
            />
        </div>
    </div>
</template>

<script>
import ProductItem from "./ProductItem.vue";
import { useProductStore } from "@/store/module/user/productStore";

export default {
    name: "product-list",
    components: { ProductItem },
    setup() {
        const store = useProductStore();

        store.getAllProducts();

        return {
            store,
        };
    },
};
</script>

<style scoped>
.container {
    max-width: 1200px;
    padding: 0 12px 40px;
}
h1 {
    margin-top: 30px;
    font-size: 30px;
    margin-bottom: 16px;
}
</style>