export default {
    baseURL: window.location.origin + '/api/users',

    login: async function (loginData) {
        const url = `${this.baseURL}/login`;
        try {
            const result = await axios.post(url, loginData);
            let user = null;
            if (typeof result.data === 'object') {
                user = result.data;
                window.$cookies.set('user', user);
            }
            return user;
        } catch (error) {
            throw error;
        }
    },

    logout: async function () {
        const url = `${this.baseURL}/logout`;
        try {
            await axios.post(url, {});
            window.$cookies.remove('user');
            return null;
        } catch (error) {
            throw error;
        }
    }
};