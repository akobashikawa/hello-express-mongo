export default {
    data: function () {
        return {
            baseURL: window.location.origin + '/api/users',
            users: [],
            newUser: {
                username: '',
                password: '',
            },
        };
    },
    props: ['loading'],
    created: function () {
        this.getUsers();
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
            try {
                this.users = await this.getUsersService();
            } catch (error) {
                console.log(error);
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
            try {
                await this.addUserService(this.newUser);
                this.getUsers();
            } catch (error) {
                console.log(error);
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
            try {
                await this.deleteUserService(user._id);
                this.getUsers();
            } catch (error) {
                console.log(error);
                this.$toasted.show("Problem to delete the user", {
                    type: 'error'
                });
            }
        },

        editUser: function (user) {
            this.$set(user, 'editing', true);
            this.$set(user, 'usernameUpdate', user.username);
            this.$set(user, 'passwordUpdate', user.password);
            // this seems tricky
            this.$nextTick(() => {
                this.$refs['username_' + user._id][0].focus();
            });
        },
        cancelEditUser: function (user) {
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
            this.$set(user, 'editing', false);
            this.$set(user, 'username', user.usernameUpdate);
            this.$set(user, 'password', user.passwordUpdate);
            try {
                await this.updateUserService(user);
                this.getUsers();
            } catch (error) {
                console.log(error);
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

        <div class="users-list" v-if="(users.length > 0)">

            <div class="text-right">
                <button class="btn btn-outline-info btn-sm" @click="getUsers" :disabled="loading">Refresh</button>
            </div>

            <table class="table table-hover mt-1">
                <tbody>
                    <tr v-for="user in users">
                        <td>
                            <div class="user-view" :class="{'done': user.done}" v-if="!user.editing" @dblclick="editUser(user)">
                                {{ user.username }}
                            </div>
                            <div class="user-edit" v-show="user.editing">
                                <div class="form-row">
                                    <div class="col-md-6"> 
                                        <label>Username</label>
                                        <input type="text" class="form-control" v-model="user.usernameUpdate" :ref="'username_' + user._id" placeholder="Username" v-on:keyup.esc="cancelEditUser(user)">
                                    </div>
                                    <div class="col-md-6">
                                        <label>Password</label>
                                        <input type="text" class="form-control" v-model="user.passwordUpdate" :ref="'password_' + user._id" placeholder="Password" v-on:keyup.esc="cancelEditUser(user)">
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
    </div>`,
};