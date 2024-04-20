<template>
    <div class="col-3">
        <router-link
            :to="{ name: 'productDetail', params: { id: prod.id } }"
            class="product-item"
        >
            <img :src="prod.image" alt="product" />
            <p class="prod-name">{{ prod.name }}</p>
            <p class="prod-price">{{ formatterNumber }} đ</p>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "product-item",
    props: ["prod"],
    setup(props) {
        const formatterNumber = props.prod.price.toLocaleString();

        return { formatterNumber };
    },
};
</script>

<style scoped>
.product-item {
    background-color: #fff;
    padding: 10px;
    display: block;
    text-decoration: none;
    margin-bottom: 14px;
    border: 1px solid #f6f5f5;
    border-radius: 3px;
    box-shadow: 0 0 5px #ccc;
}
.product-item:hover {
    box-shadow: 0 0 transparent, 0 0 transparent, 0 0 transparent,
        0 0 transparent, 0 1px 20px 0 rgba(0, 0, 0, 0.05);
}
.product-item img {
    width: 100%;
}
.product-item .prod-name {
    color: #000;
    font-size: 17px;
    margin: 4px 0;
}
.product-item .prod-price {
    color: red;
    margin: 0;
}
</style>