<template>
    <form @submit.prevent="handleSearch" class="form-search">
        <input v-model="title" type="text" placeholder="Tìm kiếm..." />
        <button type="submit" class="search-btn">
            <font-awesome-icon
                class="search-icon"
                :icon="['fas', 'magnifying-glass']"
            />
        </button>
    </form>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useProductStore } from "@/store/module/user/productStore";
import { ref } from "vue";
export default {
    name: "search-wrapper",
    components: { FontAwesomeIcon },
    setup() {
        const title = ref("");

        const storeProduct = useProductStore();

        const handleSearch = () => {
            // console.log(title.value);
            storeProduct.searchProductByCategory(title.value);
            title.value = "";
        };

        return { title, handleSearch, storeProduct };
    },
};
</script>

<style scoped>
.search-btn {
    width: 50px;
    height: 40px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    border: none;
}
.search-icon {
    font-size: 20px;
    margin-top: 4px;
}
.form-search input {
    padding: 2px 12px;
    width: 300px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    border: none;
    height: 40px;
}
.form-search input:focus-visible {
    outline: none;
}
.form-search {
    display: flex;
    align-items: center;
}
</style>