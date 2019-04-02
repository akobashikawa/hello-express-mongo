import loginService from './services/login.js';

Vue.use(Vuex);

const user = {
    state: {
        user: null
    },
    getters: {
        user: state => state.user
    },
    mutations: {
        login: (state, user) => state.user = user,
        logout: (state) => state.user = null
    },
    actions: {
        loginUser: async ({ commit }, loginData) => {
            const user = await loginService.login(loginData);
            commit('login', user);
        },
        logoutUser: ({ commit }) => {
            loginService.logout();
            commit('logout');
        }
    }
};

export default new Vuex.Store({
    modules: {
        user
    }
});