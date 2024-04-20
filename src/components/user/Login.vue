<template>
    <div class="container">
        <form @submit.prevent="handleLogin">
            <h1>Đăng nhập</h1>
            <div class="form-group">
                <label>Email</label>
                <input
                    type="email"
                    class="form-control"
                    :class="
                        userStore.validateEmail()
                            ? userStore.validateEmailClass
                            : userStore.errorEmailClass
                    "
                    placeholder="Nhập email"
                    v-model="userStore.email"
                    @change="userStore.validateEmail()"
                />
                <span class="error" v-if="!userStore.validateEmail()">{{
                    userStore.textErrEmail
                }}</span>
                <span class="error" v-if="handleLogin">{{
                    userStore.errorSubmitEmail
                }}</span>
            </div>
            <div class="form-group">
                <label>Mật khẩu</label>
                <input
                    type="password"
                    v-model="userStore.password"
                    class="form-control"
                    placeholder="Nhập mật khẩu"
                    @change="userStore.validatePassword()"
                    :class="
                        userStore.validatePassword()
                            ? userStore.validatePasswordClass
                            : userStore.errorPasswordClass
                    "
                />
                <span class="error" v-if="!userStore.validatePassword()">{{
                    userStore.textErrPassword
                }}</span>
                <span class="error" v-if="handleLogin">{{
                    userStore.errorSubmitPassword
                }}</span>
            </div>
            <button type="submit" class="btn btn-primary">Đăng nhập</button>
        </form>
    </div>
</template>

<script>
import { useUserStore } from "@/store/module/user/userStore";
export default {
    name: "login-wrapper",
    setup() {
        const userStore = useUserStore();

        const handleLogin = () => {
            if (userStore.email.length === 0) {
                userStore.errorSubmitEmail = "Email là bắt buộc";
            }
            if (userStore.password.length === 0) {
                userStore.errorSubmitPassword = "Mật khẩu là bắt buộc";
            }
            if (
                userStore.errorSubmitEmail === "" &&
                userStore.errorSubmitPassword === ""
            ) {
                userStore.login();
            }
        };

        return {
            userStore,
            handleLogin,
        };
    },
};
</script>

<style scoped>
.container {
    max-width: 500px;
    margin: 50px auto;
}
form {
    background-color: #fff;
    padding: 12px 18px;
    border-radius: 4px;
}
form h1 {
    font-size: 30px;
    text-align: center;
    font-weight: 600;
    margin-bottom: 20px;
}
.form-group {
    margin-bottom: 12px;
}
.form-group label {
    margin-left: 2px;
}
.form-control:focus {
    box-shadow: unset;
}
.form-control.input-red:focus,
.form-control.input-red {
    border-color: red;
}
.form-control.validate:focus,
.form-control.validate {
    border-color: #17e700;
}
.error {
    color: red;
    font-size: 12px;
}
</style>