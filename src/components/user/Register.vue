<template>
    <div class="container">
        <form @submit.prevent="handleRegister">
            <h1>Đăng ký</h1>
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
                    v-model="userStore.email"
                    @change="userStore.validateEmail()"
                />
                <span class="error" v-if="!userStore.validateEmail()">{{
                    userStore.textErrEmail
                }}</span>
                <span class="error" v-if="handleRegister">{{
                    userStore.errorSubmitEmail
                }}</span>
            </div>
            <div class="form-group">
                <label>Tên</label>
                <input
                    type="text"
                    v-model="userStore.firstName"
                    class="form-control"
                    @change="userStore.validateFirstName()"
                    :class="
                        userStore.validateFirstName()
                            ? userStore.validateFirstNameClass
                            : ''
                    "
                />
                <span class="error" v-if="userStore.validateFirstName()">{{
                    userStore.errorFirstName
                }}</span>
                <span class="error" v-if="handleRegister">{{
                    userStore.errorFirstName
                }}</span>
            </div>
            <div class="form-group">
                <label>Họ</label>
                <input
                    type="text"
                    v-model="userStore.lastName"
                    class="form-control"
                    @change="userStore.validateLastName()"
                    :class="
                        userStore.validateLastName()
                            ? userStore.validateLastNameClass
                            : ''
                    "
                />
                <span class="error" v-if="userStore.validateLastName()">{{
                    userStore.errorLastName
                }}</span>
                <span class="error" v-if="handleRegister">{{
                    userStore.errorLastName
                }}</span>
            </div>
            <div class="form-group">
                <label>Mật khẩu</label>
                <input
                    type="password"
                    v-model="userStore.password"
                    class="form-control"
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
                <span class="error" v-if="handleRegister">{{
                    userStore.errorSubmitPassword
                }}</span>
            </div>
            <button type="submit" class="btn btn-primary">Đăng ký</button>
        </form>

        <div v-if="userStore.showPopupRegister" class="popup-success">
            <font-awesome-icon class="popup-icon" :icon="['fas', 'check']" />
            <p>Đăng ký thành công!</p>
        </div>
    </div>
</template>

<script>
import { useUserStore } from "@/store/module/user/userStore";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
    name: "register-wrapper",
    components: { FontAwesomeIcon },
    setup() {
        const userStore = useUserStore();

        const handleRegister = () => {
            if (userStore.email.length === 0) {
                userStore.errorSubmitEmail = "Email là bắt buộc";
            }
            if (userStore.password.length === 0) {
                userStore.errorSubmitPassword = "Mật khẩu là bắt buộc";
            }
            if (userStore.firstName.length === 0) {
                userStore.errorFirstName = "Tên là bắt buộc";
            }
            if (userStore.lastName.length === 0) {
                userStore.errorLastName = "Họ là bắt buộc";
            }
            if (
                userStore.errorSubmitEmail === "" &&
                userStore.errorSubmitPassword === "" &&
                userStore.errorFirstName === "" &&
                userStore.errorLastName === ""
            ) {
                userStore.showPopupRegister = true;
                setTimeout(() => {
                    userStore.showPopupRegister = false;
                    userStore.register();
                }, 2000);
            }
        };

        return {
            userStore,
            handleRegister,
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

/*  */
.popup-success {
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
.popup-success p {
    margin: 0;
    margin-left: 10px;
}
</style>