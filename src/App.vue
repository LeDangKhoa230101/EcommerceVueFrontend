<template>
    <Header />
    <div v-if="userStore.isRole === 'ROLE_USER'" class="user">
        <router-view />
    </div>
    <div v-else-if="userStore.isRole === 'ROLE_ADMIN'" class="admin">
        <router-view />
    </div>
    <Footer />
</template>

<script>
import Header from "./components/user/Header.vue";
import Footer from "./components/user/Footer.vue";
import { useUserStore } from "@/store/module/user/userStore";

export default {
    name: "App",
    components: { Header, Footer },
    setup() {
        const userStore = useUserStore();

        return {
            userStore,
        };
    },
};
</script>

<style>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.user {
    background: #f5f5f5;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
.admin {
    background: #f5f5f5;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
</style>
