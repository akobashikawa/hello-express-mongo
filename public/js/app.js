import router from './router.js';
import store from './store.js';

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

Vue.component('LoginButton', {
    template: `
<div>
<ul class="navbar-nav px-3">
    <router-link to="/login" class="nav-link">
        <i class="material-icons">account_box</i>
        Login
    </router-link>
    <router-link to="/logout" class="nav-link">
        <i class="material-icons">account_box</i>
        {{  }} :
        Logout
    </router-link>
</ul>
</div>`
});


const app = new Vue({
    router,
    store,
    data: {
        loading: false
    }
}).$mount('#app');
