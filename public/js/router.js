import Home from './components/home.js';
import Login from './components/login.js';
import Tasks from './components/tasks.js';
import Users from './components/users.js';

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home, props: { className: 'p-4 shadow' } },
        { path: '/login', component: Login, props: { className: 'p-4 shadow' } },
        { path: '/users', component: Users, props: { className: 'p-4 shadow' } },
        { path: '/tasks', component: Tasks, props: { className: 'p-4 shadow' } },
    ]
});

export default router;