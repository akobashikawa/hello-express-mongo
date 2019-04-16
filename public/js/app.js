import router from './router.js';
import store from './store.js';


Vue.use(Toasted, {
    position: 'bottom-center',
    duration: 2000
});

axios.interceptors.request.use(function (config) {
    const user = store.getters['user'];
    if (user) {
        config.headers['Authorization'] = `Bearer ${user.token}`;
    }
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
            return this.$store.getters['auth/user'];
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
    },
    created: function () {
        // update store after page reload
        try {
            const userJson = localStorage.getItem('user');
            const user = (userJson == undefined) ? JSON.parse(userJson) : null;
            this.$store.commit('auth/setUser', user);
        } catch (error) {
            console.log(error);
        }
    }
}).$mount('#app');
