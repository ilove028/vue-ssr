export default {
    namespaced: true,
    state: () => ({
        count: 0
    }),
    actions: {
        increment({ commit }){
            commit('increment');
        }
    },
    mutations: {
        increment: state => state.count++
    }
};