import axios from 'axios'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        carts: [],
        baseURL: 'http://localhost:8081/cart',
        openPopupUpdateCart: false,
        quantity: 0,
        numberPhone: '',
        address: '',
        note: '',
        openPopupCheckout: false
    }),
    getters: {
        getQuantityCart() {
            const quanty = localStorage.getItem('quantyCart')
            return quanty;
        },
    },
    actions: {
        async getAllCart() {
            try {
                const token = localStorage.getItem('userToken')
                await axios.get(`${this.baseURL}/?token=` + token)
                    .then((res) => {
                        this.carts = res.data.cartItems;
                        this.quantity = this.carts.length;
                        localStorage.setItem('quantyCart', this.quantity)
                    })
            } catch (error) {
                console.log(error);
            }
        },

        async updateCart(cartItemId, quantity) {
            try {
                const token = localStorage.getItem('userToken');
                await axios.put(`${this.baseURL}/update/${cartItemId}/?quantity=` + quantity + `&token=` + token)
            } catch (error) {
                console.log(error);
            }
        },
        async deleteCart(cartItemId) {
            try {
                const token = localStorage.getItem('userToken');
                await axios.delete(`${this.baseURL}/delete/${cartItemId}?token=` + token)
                this.carts = this.carts.filter((cart) => cart.id != cartItemId)
                localStorage.setItem('quantyCart', this.carts.length)
            } catch (error) {
                console.log(error);
            }
        },
        async checkout() {
            try {
                const token = localStorage.getItem('userToken')
                await axios.post(`${this.baseURL}/checkout?phone=` + this.numberPhone + `&address=` + this.address + `&note=` + this.note + `&token=` + token)
                this.numberPhone = ''
                this.address = ''
                this.note = ''
                this.getQuantityCart
            } catch (error) {
                console.log(error);
            }
        }
    }
})