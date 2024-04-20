import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductManagerStore = defineStore('prod-manager', {
    state: () => ({
        products: [],
        baseURL: 'http://localhost:8081/product',

        name: '',
        description: '',
        image: '',
        price: 0,
        category: '',

        nameUpdate: '',
        descriptionUpdate: '',
        imageUpdate: '',
        priceUpdate: 0,
        categoryUpdate: '',

        showPopupAddProduct: false,
        showPopupUpdateProduct: false,
    }),
    getters: {

    },
    actions: {
        async getAllProduct() {
            try {
                await axios.get(`${this.baseURL}/`)
                    .then((res) => {
                        this.products = res.data
                    })
            } catch (error) {
                console.log(error);
            }
        },
        async addProduct() {
            try {
                const product = {
                    name: this.name,
                    description: this.description,
                    image: this.image,
                    price: this.price,
                    category: this.category
                }
                await axios.post(`${this.baseURL}/admin/add-product`, product)
            } catch (error) {
                console.log(error);
            }
        },
        async getProductById(productId) {
            try {
                await axios.get(`${this.baseURL}/${productId}`)
                    .then((res) => {
                        if (res.data.id === productId) {
                            const product = res.data
                            this.imageUpdate = product.image
                            this.nameUpdate = product.name
                            this.descriptionUpdate = product.description
                            this.priceUpdate = product.price
                            this.categoryUpdate = product.category.id
                        }
                    })
            } catch (error) {
                console.log(error);
            }
        },
        async updateProduct(productId) {
            try {
                const product = {
                    name: this.nameUpdate,
                    description: this.descriptionUpdate,
                    image: this.imageUpdate,
                    price: this.priceUpdate,
                    category: this.categoryUpdate
                }
                await axios.post(`${this.baseURL}/update-product/${productId}`, product)
            } catch (error) {
                console.log(error);
            }
        },
        async deleteProduct(productId) {
            try {
                await axios.post(`${this.baseURL}/admin/delete-product/${productId}`)
                this.products = this.products.filter((prod) => prod.id !== productId)
            } catch (error) {
                console.log(error);
            }
        }
    }
})