import Vue from 'vue';
import App from './App.vue';

/**
 * 返回vue实例
 * @return {}
 */
export default () => {
    const app = new Vue({
        render(h){
            return h(App); 
        }
    });

    return { app };
};