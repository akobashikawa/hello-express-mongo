import authService from './services/auth.js';

Vue.use(Vuex);

const auth = {
    namespaced: true,
    state: {
        user: null
    },
    getters: {
        user: state => state.user,
    },
    mutations: {
        setUser: (state, user) => {
            state.user = (user ? user : null)
        },
    },
    actions: {
        loginUser: async ({ commit }, loginData) => {
            const user = await authService.login(loginData);
            commit('setUser', user);
        },
        logoutUser: async ({ commit }) => {
            await authService.logout();
            commit('setUser', null);
        }
    }
};

export default new Vuex.Store({
    modules: {
        auth
    }
});