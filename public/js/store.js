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
            console.log('store.mutations.setUser', user);
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
            const user = await usersService.getAuthorized();
            console.log({ user });
            commit('setUser', user);
        }
    }
};

export default new Vuex.Store({
    modules: {
        user
    }
});