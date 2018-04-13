import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default () => {
    return new Router({
        mode: 'history',
        routes: [
            { path: '/', component: () => import('../view/Home.vue') },
            { path: '/about', component: () => import('../view/About.vue') }
        ]
    });
};