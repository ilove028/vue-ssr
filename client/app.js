import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import createRouter from './router';
import createStore from './store';

/**
 * 返回vue实例
 * @return {}
 */
export default (context) => {
    const router = createRouter(context);
    const store = createStore(context);

    //TODO vuex-router-sync api
    sync(store, router);

    const app = new Vue({
        router,
        store,
        render(h){
            return h(App); 
        }
    });

    return { app, router, store };
};