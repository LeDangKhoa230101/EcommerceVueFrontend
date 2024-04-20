import { defineStore } from 'pinia';
import axios from "axios";
import router from '@/router/index';

export const useUserStore = defineStore('user-store', {
    state: () => ({
        isAuthentication: localStorage.getItem('isAuthentication') === 'true',
        isRole: "ROLE_USER",
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        email: '',
        password: '',
        firstName: '',
        lastName: '',

        showPopupRegister: false,
        showPopupLogin: false,

        errorFirstName: '',
        errorLastName: '',
        validateFirstNameClass: '',
        validateLastNameClass: '',

        errorSubmitEmail: '',
        errorSubmitPassword: '',

        textErrEmail: '',
        validateEmailClass: '',
        errorEmailClass: '',

        textErrPassword: '',
        validatePasswordClass: '',
        errorPasswordClass: '',
    }),
    getters: {

    },
    actions: {
        validateEmail() {
            if (this.email.length > 0 && this.pattern.test(this.email)) {
                this.validateEmailClass = "validate";
                this.textErrEmail = "";
                this.errorEmailClass = "";
                this.errorSubmitEmail = "";
                return true;
            } else if (
                this.email.length > 0 &&
                !this.pattern.test(this.email)
            ) {
                this.errorEmailClass = "input-red";
                this.validateEmailClass = "";
                this.textErrEmail = "Chưa đúng định dạng email";
                this.errorSubmitEmail = "";
                return false;
            }
            if (this.email.length === 0) {
                this.errorEmailClass = "";
                this.validateEmailClass = "";
                this.textErrEmail = "";
            }
            return false;
        },
        validatePassword() {
            if (this.password.length >= 6) {
                this.validatePasswordClass = "validate";
                this.textErrPassword = "";
                this.errorPasswordClass = "";
                this.errorSubmitPassword = "";
                return true;
            } else if (this.password.length < 6 && this.password.length > 0) {
                this.errorPasswordClass = "input-red";
                this.validatePasswordClass = "";
                this.textErrPassword = "Mật khẩu tối thiểu 6 ký tự";
                this.errorSubmitPassword = "";
                return false;
            }
            if (this.password.length === 0) {
                this.errorPasswordClass = "";
                this.validatePasswordClass = "";
                this.textErrPassword = "";
            }
            return false;
        },
        validateFirstName() {
            if (this.firstName.length > 0) {
                this.errorFirstName = ''
                this.validateFirstNameClass = "validate";
                return true;
            }
            return false;
        },
        validateLastName() {
            if (this.lastName.length > 0) {
                this.validateLastNameClass = "validate";
                this.errorLastName = ''
                return true;
            }
            return false;
        },
        async register() {
            try {
                const user = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password
                }
                await axios.post('http://localhost:8081/signup', user)
                    .then(() => {
                        router.push('/login')
                    })
            } catch (error) {
                console.log(error);
            }
        },
        async login() {
            try {
                const user = {
                    email: this.email,
                    password: this.password
                }
                await axios.post('http://localhost:8081/login', user)
                    .then(res => {
                        this.isRole = res.data.role;

                        localStorage.setItem('userToken', res.data.token)
                        localStorage.setItem('userRole', res.data.role)

                        const token = localStorage.getItem('userToken');
                        const role = localStorage.getItem('userRole');

                        if (token && role === "ROLE_USER") {
                            this.isAuthentication = true;
                            localStorage.setItem('isAuthentication', 'true')
                            router.push("/");
                        } else if (token && role === "ROLE_ADMIN") {
                            this.isAuthentication = true;
                            localStorage.setItem('isAuthentication', 'true')
                            router.push("/admin");
                        }
                    })
            } catch (error) {
                console.log(error);
            }
        },
        async logout() {
            try {
                const token = localStorage.getItem('userToken');
                await axios.post('http://localhost:8081/logout?token=' + token)
                localStorage.clear();
                this.isAuthentication = false
                this.isRole = "ROLE_USER"
            } catch (error) {
                console.log(error);
            }
        }
    }
})