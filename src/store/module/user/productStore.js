import { defineStore } from 'pinia';
import axios from "axios";

export const useProductStore = defineStore('product-store', {
    state: () => ({
        products: [],
        quantity: 1,
        baseURL: 'http://localhost:8081/'
    }),
    getters: {

    },
    actions: {
        async getAllProducts() {
            try {
                const reponse = await axios.get('http://localhost:8081/product/')
                this.products = reponse.data;
                localStorage.setItem('products', JSON.stringify(this.products));
            } catch (error) {
                console.log(error);
            }
        },
        async searchProductByCategory(name) {
            try {
                const res = await axios.get(`${this.baseURL}product/search?name=${name}`)
                this.products = res.data;
            } catch (error) {
                console.log(error);
            }
        },
        getProductById(id) {
            localStorage.getItem('products')
            let products = JSON.parse(localStorage.getItem('products'));
            if (products) {
                const product = products.find((prod) => prod.id === id);
                return product;
            }
            return null;
        },
        async addToCart(productId) {
            try {
                const token = localStorage.getItem('userToken')
                await axios.post(`${this.baseURL}cart/add/${productId}` + `?quantity=` + this.quantity + `&token=` + token)
            } catch (error) {
                console.log(error);
            }
        }
    }
})