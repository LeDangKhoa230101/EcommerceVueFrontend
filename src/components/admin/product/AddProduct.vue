<template>
    <div class="container">
        <div class="row">
            <router-link to="/product-manager" class="btn btn-primary back-btn"
                >Quay lại</router-link
            >
            <div class="col-12">
                <form @submit.prevent="handleAddProduct">
                    <div class="form-group">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Link sản phẩm*"
                            v-model="productStore.image"
                        />
                    </div>
                    <div class="form-group">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Tên sản phẩm*"
                            v-model="productStore.name"
                        />
                    </div>
                    <div class="form-group">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Mô tả*"
                            v-model="productStore.description"
                        />
                    </div>
                    <div class="form-group">
                        <input
                            type="number"
                            class="form-control"
                            placeholder="Giá*"
                            v-model="productStore.price"
                        />
                    </div>
                    <div class="form-group">
                        <select
                            class="custom-select"
                            v-model="productStore.category"
                        >
                            <option selected disabled value="">
                                Danh mục*
                            </option>
                            <option value="1">Dell</option>
                            <option value="2">Asus</option>
                            <option value="3">Lenovo</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Thêm</button>
                </form>
            </div>
        </div>
        <PopupAddProduct
            :showPopupAddProduct="productStore.showPopupAddProduct"
        />
    </div>
</template>

<script>
import { useProductManagerStore } from "@/store/module/admin/productManagerStore";
import router from "@/router/index";
import PopupAddProduct from "./PopupAddProduct.vue";
export default {
    name: "add-product",
    components: { PopupAddProduct },
    setup() {
        const productStore = useProductManagerStore();

        const handleAddProduct = () => {
            if (
                productStore.name !== "" &&
                productStore.description !== "" &&
                productStore.image !== "" &&
                productStore.price !== 0 &&
                productStore.category !== ""
            ) {
                productStore.addProduct();
                productStore.showPopupAddProduct = true;
                setTimeout(() => {
                    productStore.showPopupAddProduct = false;
                    router.push("/product-manager");
                }, 2000);
            }
        };

        return {
            productStore,
            handleAddProduct,
        };
    },
};
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: 40px auto;
    position: relative;
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