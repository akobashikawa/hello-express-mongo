export default {
    data: function () {
        return {
            baseURL: window.location.origin + '/api/users',
            username: '',
            password: '',
            error: '',
        };
    },
    props: ['loading', 'logged'],
    computed: {
        loginData: function () {
            return {
                username: this.username,
                password: this.password
            };
        },
        user: function () {
            return this.$store.getters['user'];
        }
    },
    created: function () {
    },
    mounted: function () {
    },
    methods: {
        login: async function () {
            this.error = '';
            try {
                this.$store.dispatch('loginUser', this.loginData);
            } catch (error) {
                console.log(error);
                this.error = error.response.data.message;
                this.$toasted.show("Problem to login the user", {
                    type: 'error'
                });
            }
        },
        logout: async function () {
            console.log('logout');
            this.error = '';
            try {
                this.$store.dispatch('logoutUser');
            } catch (error) {
                console.log(error);
                this.error = error.response.data.message;
                this.$toasted.show("Problem to logout the user", {
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
                    <button v-if="user" class="btn btn-warning" @click="logout" :disabled="loading">Logout</button>
                </div>
            </div>

            <pre class="text-white bg-success p-2" v-if="user">{{ user }}</pre>

            <pre class="text-white bg-danger p-2" v-if="error">{{ error }}</pre>
        </div>

    </div>`,
};