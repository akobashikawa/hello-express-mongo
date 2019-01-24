const app = new Vue({
    el: '#app',
    data: {
        urlBase: window.location.origin + '/api/tasks',
        tasks: [],
        newTask: {
            description: ''
        },
        loading: false,
    },
    created: function () {
        this.getTasks();
    },
    methods: {
        getTasksService: async function () {
            const url = `${this.urlBase}/`;
            try {
                const result = await axios.get(url);
                return result.data;
            } catch (error) {
                console.log(error);
            }
        },
        getTasks: async function () {
            this.loading = true;
            try {
                this.tasks = await this.getTasksService();
                this.loading = false;
            } catch (error) {
                console.log(error);
            }
        },

        addTaskService: async function (data) {
            const url = `${this.urlBase}/`;
            try {
                const result = await axios.post(url, data);
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        },
        addTask: async function () {
            this.loading = true;
            try {
                await this.addTaskService(this.newTask);
                this.getTasks();
            } catch (error) {
                console.log(error);
            }
        },

        deleteTaskService: async function (id) {
            const url = `${this.urlBase}/${id}`;
            try {
                const result = await axios.delete(url);
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        },
        deleteTask: async function (task) {
            this.loading = true;
            try {
                await this.deleteTaskService(task._id);
                this.getTasks();
            } catch (error) {
                console.log(error);
            }
        },

        editTask: function (task) {
            this.$set(task, 'editing', true);
            this.$set(task, 'descriptionUpdate', task.description);
        },

        saveTaskService: async function (task) {
            const url = `${this.urlBase}/${task._id}`;
            try {
                const result = await axios.put(url, task);
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        },
        saveTask: async function (task) {
            this.loading = true;
            this.$set(task, 'editing', false);
            // task.description = task.descriptionUpdate;
            this.$set(task, 'description', task.descriptionUpdate);
            try {
                await this.saveTaskService(task);
                this.getTasks();
            } catch (error) {
                console.log(error);
            }
        },
    }
});
