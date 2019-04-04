import router from './router.js';
import store from './store.js';

import usersService from './services/users.js';

Vue.use(Toasted, {
    position: 'bottom-center',
    duration: 2000
});

axios.interceptors.request.use(function (config) {
    app.loading = true;
    return config;
}, function (error) {
    app.loading = false;
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    app.loading = false;
    return response;
}, function (error) {
    app.loading = false;
    return Promise.reject(error);
});

const LoginButton = {
    template: `
<div>
<ul class="navbar-nav px-3">
    <router-link to="/login" class="nav-link" v-if="!user">
        <i class="material-icons">account_box</i>
        Login
    </router-link>
    <router-link to="/login" class="nav-link" v-if="user">
        <i class="material-icons">account_box</i>
        {{ user.username }} :
        Logout
    </router-link>
</ul>
</div>`,
    computed: {
        user: function () {
            return this.$store.getters['user'];
        }
    }
};


const app = new Vue({
    router,
    store,
    data: {
        loading: false
    },
    components: { LoginButton },
    computed: {
        cookies: function () {
            return window.$cookies.keys();
        },
        sessionCookie: function () {
            return window.$cookies.get('connect.sid');
        },
    },
    created: async function () {
        // update store after page reload
        try {
            const user = await usersService.getAuthorized();
            this.$store.commit('setUser', user);
        } catch (error) {
            console.log(error);
        }
    }
}).$mount('#app');
