import usersService from './services/users.js';

Vue.use(Vuex);

const user = {
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
            const user = await usersService.login(loginData);
            commit('setUser', user);
        },
        logoutUser: async ({ commit }) => {
            await usersService.logout();
            commit('setUser', null);
        }
    }
};

export default new Vuex.Store({
    modules: {
        user
    }
});