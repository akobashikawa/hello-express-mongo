import Tasks from './components/tasks.js';
import Users from './components/users.js';
import Login from './components/login.js';

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

const app = new Vue({
    el: '#app',
    data: {
        loading: false
    },
    components: {
        Tasks, Users, Login
    },
});
