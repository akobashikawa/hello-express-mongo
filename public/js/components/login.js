export default {
    data: function () {
        return {
            baseURL: window.location.origin + '/api/users',
            username: '',
            password: '',
            user: null,
            error: '',
        };
    },
    props: ['loading'],
    computed: {
        loginData: function () {
            return {
                username: this.username,
                password: this.password
            };
        },
    },
    created: function () {
    },
    mounted: function () {
    },
    methods: {
        loginService: async function (loginData) {
            const url = `${this.baseURL}/login`;
            try {
                const result = await axios.post(url, loginData);
                if (typeof result.data === 'object') {
                    return result.data;
                }
                return '';
            } catch (error) {
                throw error;
            }
        },
        login: async function () {
            this.user = null;
            this.error = '';
            try {
                this.user = await this.loginService(this.loginData);
            } catch (error) {
                console.log(error);
                this.error = error.response.data.message;
                this.$toasted.show("Problem to login the users", {
                    type: 'error'
                });
            }
        },

    },
    template: `<div class="login-component">

        <h2>Login</h2>

        <div class="user-add mb-2">
            <div class="input-group">
                <input type="text" class="form-control" v-model="username" placeholder="Username">
                <input type="text" class="form-control" v-model="password" placeholder="Password">
                <div class="input-group-append">
                    <button class="btn btn-primary" @click="login" :disabled="loading">Login</button>
                </div>
            </div>

            <pre class="text-white bg-success p-2" v-if="user"><div class="text-right"><button class="btn btn-sm btn-success" @click="user=null">Close</button></div>{{ user }}</pre>

            <pre class="text-white bg-danger p-2" v-if="error"><div class="text-right"><button class="btn btn-sm btn-danger" @click="error=''">Close</button></div>{{ error }}</pre>
        </div>

    </div>`,
};