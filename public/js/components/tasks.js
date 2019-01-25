export default {
    data: function () {
        return {
            baseURL: window.location.origin + '/api/tasks',
            tasks: [],
            newTask: {
                description: '',
                done: false,
            },
            error: '',
        };
    },
    props: ['loading'],
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
                throw error;
            }
        },
        getTasks: async function () {
            this.error = '';
            try {
                this.tasks = await this.getTasksService();
            } catch (error) {
                console.log(error);
                this.error = error.response.data.message;
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
                throw error;
            }
        },
        addTask: async function () {
            this.error = '';
            try {
                await this.addTaskService(this.newTask);
                this.getTasks();
            } catch (error) {
                console.log(error);
                this.error = error.response.data.message;
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
                throw error;
            }
        },
        deleteTask: async function (task) {
            this.error = '';
            try {
                await this.deleteTaskService(task._id);
                this.getTasks();
            } catch (error) {
                console.log(error);
                this.error = error.response.data.message;
                this.$toasted.show("Problem to delete the task", {
                    type: 'error'
                });
            }
        },

        editTask: function (task) {
            this.error = '';
            this.$set(task, 'editing', true);
            this.$set(task, 'descriptionUpdate', task.description);
            // this seems tricky
            this.$nextTick(() => {
                this.$refs['task_' + task._id][0].focus();
            });
        },
        cancelEditTask: function (task) {
            this.error = '';
            this.$set(task, 'editing', false);
        },

        updateTaskService: async function (task) {
            const url = `${this.baseURL}/${task._id}`;
            try {
                const result = await axios.put(url, task);
                return result;
            } catch (error) {
                throw error;
            }
        },
        saveTask: async function (task) {
            this.error = '';
            this.$set(task, 'editing', false);
            const bak = {
                description: task.description,
            };
            this.$set(task, 'description', task.descriptionUpdate);
            try {
                await this.updateTaskService(task);
                this.getTasks();
            } catch (error) {
                console.log(error);
                this.$set(task, 'description', bak.description);
                this.error = error.response.data.message;
                this.$toasted.show("Problem to save the task", {
                    type: 'error'
                });
            }
        },

        doneTask: async function (task) {
            this.error = '';
            this.$set(task, 'editing', false);
            this.$set(task, 'done', true);
            try {
                await this.updateTaskService(task);
                this.getTasks();
            } catch (error) {
                console.log(error);
                this.error = error.response.data.message;
                this.$toasted.show("Problem to update the task status", {
                    type: 'error'
                });
            }
        },
        undoneTask: async function (task) {
            this.error = '';
            this.$set(task, 'editing', false);
            this.$set(task, 'done', false);
            try {
                await this.updateTaskService(task);
                this.getTasks();
            } catch (error) {
                console.log(error);
                this.error = error.response.data.message;
                this.$toasted.show("Problem to update the task status", {
                    type: 'error'
                });
            }
        },
    },
    template: `<div class="tasks-component">

        <h2>Tasks</h2>

        <div class="task-add mb-2">
            <div class="input-group">
                <input type="text" class="form-control" v-model="newTask.description" placeholder="Description">
                <div class="input-group-append">
                    <button class="btn btn-primary" @click="addTask" :disabled="loading">Add</button>
                </div>
            </div>
        </div>

        <div class="tasks-list" v-if="(tasks.length > 0)">

            <div class="text-right">
                <button class="btn btn-outline-info btn-sm" @click="getTasks" :disabled="loading">Refresh</button>
            </div>

            <table class="table table-hover mt-1">
                <tbody>
                    <tr v-for="task in tasks">
                        <td>
                            <div class="task-view" :class="{'done': task.done}" v-if="!task.editing" @dblclick="editTask(task)">
                                {{ task.description }}
                            </div>
                            <div class="task-edit" v-show="task.editing">
                                <input type="text" class="form-control" v-model="task.descriptionUpdate" :ref="'task_' + task._id" placeholder="Description" v-on:keyup.esc="cancelEditTask(task)">
                            </div>
                        </td>
                        <td style="width:200px;">
                            <div class="btn-group" v-if="task.editing">
                                <button class="btn btn-outline-info btn-sm" @click="saveTask(task)" :disabled="loading">Save</button>
                                <button class="btn btn-outline-secondary btn-sm" @click="cancelEditTask(task)">Cancel</button>
                            </div>
                            <div class="btn-group" v-if="!task.editing">
                                <button class="btn btn-outline-info btn-sm" @click="editTask(task)" :disabled="loading">Edit</button>
                                <button class="btn btn-outline-danger btn-sm" @click="deleteTask(task)" :disabled="loading">Delete</button>
                            </div>
                            <div class="btn-group" v-if="!task.editing">
                                <button class="btn btn-outline-secondary btn-sm" @click="doneTask(task)" :disabled="loading" v-if="!task.done">Done</button>
                                <button class="btn btn-success btn-sm" @click="undoneTask(task)" :disabled="loading" v-if="task.done">Done</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <pre class="text-white bg-danger p-2" v-if="error"><div class="text-right"><button class="btn btn-sm btn-danger" @click="error=''">Close</button></div>{{ error }}</pre>

        </div>
    </div>`,
};