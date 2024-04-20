<template>
    <div v-if="showPopupAddProduct" class="add-product-popup">
        <font-awesome-icon class="popup-icon" :icon="['fas', 'check']" />
        <p>Thêm sản phẩm thành công!</p>
    </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
    name: "add-product-popup",
    props: ["showPopupAddProduct"],
    components: { FontAwesomeIcon },
};
</script>

<style scoped>
.add-product-popup {
    position: absolute;
    top: 50%;
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
.add-product-popup p {
    margin: 0;
    margin-left: 10px;
}
</style>