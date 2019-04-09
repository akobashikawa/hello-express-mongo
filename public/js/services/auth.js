export default {
    baseURL: window.location.origin + '/api/auth',

    login: async function (loginData) {
        const url = `${this.baseURL}/login`;
        try {
            const result = await axios.post(url, loginData);
            let user = null;
            if (typeof result.data === 'object') {
                user = result.data;
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
            return null;
        } catch (error) {
            throw error;
        }
    },

    getAuthorized: async function () {
        const url = `${this.baseURL}/authorized`;
        try {
            const result = await axios.get(url);
            return result.data;
        } catch (error) {
            throw error;
        }
    },

    getSession: async function () {
        const url = `${this.baseURL}/session`;
        try {
            const result = await axios.get(url);
            return result;
        } catch (error) {
            throw error;
        }
    }
};