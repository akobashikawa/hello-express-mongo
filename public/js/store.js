Vue.use(Vuex);

const user = {
    state: {
        user: null
    },
    getters: {
        user: state => state.user
    },
    mutations: {
        login: (state, user) => state.user = user
    },
    actions: {
        loginUser: ({ commit }, payload) => {
            const user = { id: 'test' };
            commit('login', user)
        }
    }
};

export default new Vuex.Store({
    modules: {
        user: user
    }
});