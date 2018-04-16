import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default (context) => {
    const router = new Router({
        mode: 'history',
        routes: [
            { path: '/', component: () => import('../view/Home.vue') },
            { path: '/about', component: () => import('../view/About.vue') },
            { path: '/admin/:id', component: () => import('../view/Admin.vue'), meta: { requiresAuth: true } }
        ]
    });

    router.beforeEach((to, from ,next) => {
        if(to.matched.some(record => record.meta.requiresAuth)){
            if(true){
                next(new Error(401))
            }
        }else{
            next();
        }
    });

    return router;
};