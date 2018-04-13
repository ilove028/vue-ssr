import Vue from 'vue';
import Vuex from 'vuex';
import { queryItems } from '../service/index';

Vue.use(Vuex);

export default () => {
    return new Vuex.Store({
        state: {
            items: []
        },
        actions: {
            queryItems({ commit }){
                return queryItems().then(items => {
                    commit('setItems', { items });
                });
            }
        },
        mutations: {
            setItems(state, { items }){
                state.items = items;
            }
        }
    });
};