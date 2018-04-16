import { queryInfo } from '../../service/index';

export default {
    namespaced: true,
    state: () => ({
        info: ''
    }),
    actions: {
        queryInfo({ commit }, { id }){
            return queryInfo(id).then(info => {
                commit('setInfo', info);
            });
        }
    },
    mutations: {
        setInfo: (state, info) => state.info = info
    }
};