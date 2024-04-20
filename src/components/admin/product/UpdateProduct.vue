<template>
    <div class="container">
        <div class="row">
            <router-link to="/product-manager" class="btn btn-primary back-btn"
                >Quay lại</router-link
            >
            <div class="col-12">
                <form @submit.prevent="handleUpdate">
                    <div class="form-group">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Link sản phẩm*"
                            v-model="productStore.imageUpdate"
                        />
                    </div>
                    <div class="form-group">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Tên sản phẩm*"
                            v-model="productStore.nameUpdate"
                        />
                    </div>
                    <div class="form-group">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Mô tả*"
                            v-model="productStore.descriptionUpdate"
                        />
                    </div>
                    <div class="form-group">
                        <input
                            type="number"
                            class="form-control"
                            placeholder="Giá*"
                            v-model="productStore.priceUpdate"
                        />
                    </div>
                    <div class="form-group">
                        <select
                            class="custom-select"
                            v-model="productStore.categoryUpdate"
                        >
                            <option selected disabled value="">
                                Danh mục*
                            </option>
                            <option value="1">Dell</option>
                            <option value="2">Asus</option>
                            <option value="3">Lenovo</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        Cập nhật
                    </button>
                </form>
            </div>
        </div>
        <PopupUpdateProduct
            :showPopupUpdateProduct="productStore.showPopupUpdateProduct"
        />
    </div>
</template>

<script>
import { useProductManagerStore } from "@/store/module/admin/productManagerStore";
import PopupUpdateProduct from "./PopupUpdateProduct.vue";
import { useRoute } from "vue-router";
export default {
    name: "add-product",
    components: { PopupUpdateProduct },
    setup() {
        const productStore = useProductManagerStore();
        const route = useRoute();

        const paramId = parseInt(route.params.productId);

        productStore.getProductById(paramId);

        const handleUpdate = () => {
            productStore.updateProduct(paramId);
            productStore.showPopupUpdateProduct = true;
            setTimeout(() => {
                productStore.showPopupUpdateProduct = false;
            }, 2000);
        };

        return {
            productStore,
            handleUpdate,
        };
    },
};
</script>

<style scoped>
.container {
    max-width: 1000px;
    margin: 40px auto;
}
.back-btn {
    width: 100px;
    margin-bottom: 20px;
    margin-left: 10px;
}
.form-img {
    text-align: center;
    margin-bottom: 14px;
    position: relative;
}
.custom-file-input {
    position: absolute;
    bottom: -9px;
    margin-left: 10px;
    color: blue;
    font-size: 30px;
    cursor: pointer;
}
.add-img {
    width: 200px;
    height: 150px;
}
.form-group {
    margin-bottom: 12px;
}
.custom-select {
    height: 30px;
    width: 150px;
    padding-left: 4px;
}
</style>