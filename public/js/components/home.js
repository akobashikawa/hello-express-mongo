import usersService from '../services/users.js';

export default {
    template: `<div class="home-component">
        <h1>Home</h1>
        <p>Hello World!</p>
        <button @click="getSession()">getSession</button>
        <pre>{{ session }}</pre>
    </div>`,
    data: function () {
        return {
            session: null
        };
    },
    created: function () {
        this.getSession();
    },
    methods: {
        getSession: async function () {
            try {
                const result = await usersService.getSession();
                this.session = result.data;
            } catch (error) {
                console.log(error);
            }
        },
    }
};