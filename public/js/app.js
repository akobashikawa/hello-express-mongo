import Tasks from './components/tasks.js';

Vue.use(Toasted, {
    position: 'bottom-center',
    duration: 2000
});

axios.interceptors.request.use(function (config) {
    app.loading = true;
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    app.loading = false;
    return response;
}, function (error) {
    return Promise.reject(error);
});

const app = new Vue({
    el: '#app',
    data: {
        baseURL: window.location.origin + '/api/tasks',
        tasks: [],
        newTask: {
            description: '',
            done: false,
        },
        loading: false,
    },
    components: {
        Tasks
    },
});
