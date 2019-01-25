Vue.use(Toasted, {
    position: 'bottom-center',
    duration: 2000
});

axios.interceptors.request.use(function (config) {
    app.loading = true;
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    app.loading = false;
    return response;
}, function (error) {
    return Promise.reject(error);
});

const app = new Vue({
    el: '#app',
    data: {
        baseURL: window.location.origin + '/api/tasks',
        tasks: [],
        newTask: {
            description: '',
            done: false,
        },
        loading: false,
    },
    components: {
    },
    created: function () {
        this.getTasks();
    },
    mounted: function () {
    },
    methods: {
        getTasksService: async function () {
            const url = `${this.baseURL}/`;
            try {
                const result = await axios.get(url);
                if (typeof result.data === 'object') {
                    return result.data;
                }
                return '';
            } catch (error) {
                console.log(error);
            }
        },
        getTasks: async function () {
            try {
                this.tasks = await this.getTasksService();
            } catch (error) {
                console.log(error);
                this.$toasted.show("Problem to list the tasks", {
                    type: 'error'
                });
            }
        },

        addTaskService: async function (data) {
            const url = `${this.baseURL}/`;
            try {
                const result = await axios.post(url, data);
                return result.data;
            } catch (error) {
                console.log(error);
            }
        },
        addTask: async function () {
            try {
                await this.addTaskService(this.newTask);
                this.getTasks();
            } catch (error) {
                console.log(error);
                this.$toasted.show("Problem to add the task", {
                    type: 'error'
                });
            }
        },

        deleteTaskService: async function (id) {
            const url = `${this.baseURL}/${id}`;
            try {
                const result = await axios.delete(url);
                return result.data;
            } catch (error) {
                console.log(error);
            }
        },
        deleteTask: async function (task) {
            try {
                await this.deleteTaskService(task._id);
                this.getTasks();
            } catch (error) {
                console.log(error);
                this.$toasted.show("Problem to delete the task", {
                    type: 'error'
                });
            }
        },

        editTask: function (task) {
            this.$set(task, 'editing', true);
            this.$set(task, 'descriptionUpdate', task.description);
            // this seems tricky
            this.$nextTick(() => {
                this.$refs['task_' + task._id][0].focus();
            });
        },
        cancelEditTask: function (task) {
            this.$set(task, 'editing', false);
        },

        updateTaskService: async function (task) {
            const url = `${this.baseURL}/${task._id}`;
            try {
                const result = await axios.put(url, task);
                return result;
            } catch (error) {
                console.log(error);
            }
        },
        saveTask: async function (task) {
            this.$set(task, 'editing', false);
            this.$set(task, 'description', task.descriptionUpdate);
            try {
                await this.updateTaskService(task);
                this.getTasks();
            } catch (error) {
                console.log(error);
                this.$toasted.show("Problem to save the task", {
                    type: 'error'
                });
            }
        },

        doneTask: async function (task) {
            this.$set(task, 'editing', false);
            this.$set(task, 'done', true);
            try {
                await this.updateTaskService(task);
                this.getTasks();
            } catch (error) {
                console.log(error);
                this.$toasted.show("Problem to update the task status", {
                    type: 'error'
                });
            }
        },
        undoneTask: async function (task) {
            this.$set(task, 'editing', false);
            this.$set(task, 'done', false);
            try {
                await this.updateTaskService(task);
                this.getTasks();
            } catch (error) {
                console.log(error);
                this.$toasted.show("Problem to update the task status", {
                    type: 'error'
                });
            }
        },
    }
});
