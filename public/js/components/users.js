export default {
    data: function () {
        return {
            baseURL: window.location.origin + '/api/users',
            users: [],
            newUser: {
                username: '',
                password: '',
            },
            error: '',
        };
    },
    computed: {
        user: function () {
            return this.$store.getters['user'];
        }
    },
    props: ['loading'],
    created: function () {
    },
    mounted: function () {
    },
    methods: {
        getUsersService: async function () {
            const url = `${this.baseURL}/`;
            try {
                const result = await axios.get(url);
                if (typeof result.data === 'object') {
                    return result.data;
                }
                return '';
            } catch (error) {
                throw error;
            }
        },
        getUsers: async function () {
            this.error = '';
            try {
                this.users = await this.getUsersService();
            } catch (error) {
                console.log(error);
                this.error = error.response.data;
                this.$toasted.show("Problem to list the users", {
                    type: 'error'
                });
            }
        },

        addUserService: async function (data) {
            const url = `${this.baseURL}/`;
            try {
                const result = await axios.post(url, data);
                return result.data;
            } catch (error) {
                throw error;
            }
        },
        addUser: async function () {
            this.error = '';
            try {
                await this.addUserService(this.newUser);
                this.getUsers();
            } catch (error) {
                console.log(error);
                this.error = error.response.data;
                this.$toasted.show("Problem to add the user", {
                    type: 'error'
                });
            }
        },

        deleteUserService: async function (id) {
            const url = `${this.baseURL}/${id}`;
            try {
                const result = await axios.delete(url);
                return result.data;
            } catch (error) {
                throw error;
            }
        },
        deleteUser: async function (user) {
            this.error = '';
            try {
                await this.deleteUserService(user._id);
                this.getUsers();
            } catch (error) {
                console.log(error);
                this.error = error.response.data;
                this.$toasted.show("Problem to delete the user", {
                    type: 'error'
                });
            }
        },

        editUser: function (user) {
            this.error = '';
            this.$set(user, 'editing', true);
            this.$set(user, 'usernameUpdate', user.username);
            this.$set(user, 'password', '');
            this.$set(user, 'passwordUpdate', '');
            // this seems tricky
            this.$nextTick(() => {
                this.$refs['username_' + user._id][0].focus();
            });
        },
        cancelEditUser: function (user) {
            this.error = '';
            this.$set(user, 'editing', false);
        },

        updateUserService: async function (user) {
            const url = `${this.baseURL}/${user._id}`;
            try {
                const result = await axios.put(url, user);
                return result;
            } catch (error) {
                throw error;
            }
        },
        saveUser: async function (user) {
            this.error = '';
            this.$set(user, 'editing', false);
            const bak = {
                username: user.username,
            };
            this.$set(user, 'username', user.usernameUpdate);
            this.$set(user, 'passwordUpdate', user.passwordUpdate);
            try {
                await this.updateUserService(user);
                this.getUsers();
            } catch (error) {
                console.log(error);
                this.$set(user, 'username', bak.username);
                this.$set(user, 'password', '');
                this.error = error.response.data;
                this.$toasted.show("Problem to save the user", {
                    type: 'error'
                });
            }
        },

    },
    template: `<div class="users-component">

        <h2>Users</h2>

        <div class="user-add mb-2">
            <div class="input-group">
                <input type="text" class="form-control" v-model="newUser.username" placeholder="Username">
                <input type="text" class="form-control" v-model="newUser.password" placeholder="Password">
                <div class="input-group-append">
                    <button class="btn btn-primary" @click="addUser" :disabled="loading">Add</button>
                </div>
            </div>
        </div>

        <div class="text-right">
            <button class="btn btn-outline-info btn-sm" @click="getUsers" :disabled="loading">get All</button>
        </div>

        <div class="users-list" v-if="(users.length > 0)">

            <table class="table table-hover mt-1">
                <tbody>
                    <tr v-for="user in users">
                        <td>
                            <div class="user-view" :class="{'done': user.done}" v-if="!user.editing" @dblclick="editUser(user)">
                                {{ user.username }}
                                {{ user.password }}
                            </div>
                            <div class="user-edit" v-show="user.editing">
                                <div class="form-row">
                                    <div class="col-md-4"> 
                                        <label>Username</label>
                                        <input type="text" class="form-control" v-model="user.usernameUpdate" :ref="'username_' + user._id" placeholder="Username" v-on:keyup.esc="cancelEditUser(user)">
                                    </div>
                                    <div class="col-md-4">
                                        <label>Current password</label>
                                        <input type="text" class="form-control" v-model="user.password" placeholder="Current password" v-on:keyup.esc="cancelEditUser(user)">
                                    </div>
                                    <div class="col-md-4">
                                        <label>New password</label>
                                        <input type="text" class="form-control" v-model="user.passwordUpdate" placeholder="New password" v-on:keyup.esc="cancelEditUser(user)">
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td style="width:200px;">
                            <div class="btn-group" v-if="user.editing">
                                <button class="btn btn-outline-info btn-sm" @click="saveUser(user)" :disabled="loading">Save</button>
                                <button class="btn btn-outline-secondary btn-sm" @click="cancelEditUser(user)">Cancel</button>
                            </div>
                            <div class="btn-group" v-if="!user.editing">
                                <button class="btn btn-outline-info btn-sm" @click="editUser(user)" :disabled="loading">Edit</button>
                                <button class="btn btn-outline-danger btn-sm" @click="deleteUser(user)" :disabled="loading">Delete</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    
        <pre class="text-white bg-danger p-2" v-if="error">{{ error }}</pre>

    </div>`,
};