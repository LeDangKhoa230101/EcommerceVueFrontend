<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <router-link
                    to="/product-manager/add"
                    class="btn btn-primary add-btn"
                >
                    Thêm sản phẩm
                </router-link>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">MaHH</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col">Giá</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            :key="product.id"
                            v-for="product in productStore.products"
                        >
                            <th>{{ product.id }}</th>
                            <td>{{ product.name }}</td>
                            <td>
                                <img :src="product.image" alt="" class="img" />
                            </td>
                            <td>
                                <p class="description">
                                    {{ product.description }}
                                </p>
                            </td>
                            <td>{{ product.price.toLocaleString() }} đ</td>
                            <td>
                                <ul>
                                    <li>
                                        <router-link
                                            :to="{
                                                name: 'updateDetail',
                                                params: {
                                                    productId: product.id,
                                                },
                                            }"
                                            class="control-btn-update"
                                        >
                                            <font-awesome-icon
                                                :icon="['fas', 'pen-to-square']"
                                            />
                                        </router-link>
                                    </li>
                                    <li>
                                        <button
                                            @click="handleDelete(product.id)"
                                            class="control-btn-remove"
                                        >
                                            <font-awesome-icon
                                                :icon="['fas', 'trash-can']"
                                            />
                                        </button>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useProductManagerStore } from "@/store/module/admin/productManagerStore";
export default {
    name: "list-product",
    components: { FontAwesomeIcon },
    setup() {
        const productStore = useProductManagerStore();

        productStore.getAllProduct();

        const handleDelete = (productId) => {
            productStore.deleteProduct(productId);
        };

        return { productStore, handleDelete };
    },
};
</script>

<style scoped>
.container {
    max-width: 1000px;
    margin: 40px auto;
}
.add-btn {
    margin-bottom: 16px;
}
.img {
    width: 50px;
}
.description {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    margin: 0;
    max-width: 300px;
}
tr td ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
}
.control-btn-update {
    background-color: blue;
    border: none;
    margin-left: 10px;
    padding: 2px 6px;
    color: white;
    border-radius: 2px;
}
.control-btn-remove {
    background-color: red;
    border: none;
    margin-left: 10px;
    padding: 2px 6px;
    color: white;
    border-radius: 2px;
}
.control-btn-update:hover {
    opacity: 0.7;
}
.control-btn-remove:hover {
    opacity: 0.7;
}
</style>