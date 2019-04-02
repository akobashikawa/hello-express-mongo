export default {
    baseURL: window.location.origin + '/api/users',

    login: async function (loginData) {
        const url = `${this.baseURL}/login`;
        try {
            const result = await axios.post(url, loginData);
            if (typeof result.data === 'object') {
                return result.data;
            }
            return null;
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
    }
};