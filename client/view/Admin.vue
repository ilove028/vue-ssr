<template>
    <div>
        <h1>Hello Admin.</h1>
        <p v-text="info"></p>
    </div>
</template>
<script>
import infoModule from '../store/module/info';

export default {
    // check({ store, route, context }){
    //     return store.dispatch('check', { token: context.token });
    // },
    asyncData({ store, route }){
        console.info('Admin asyncDate create invoked.');
        store.registerModule('info', infoModule);
        return store.dispatch('info/queryInfo', { id: route.params.id });
    },
    beforeCreate(){
        console.info('Admin before create invoked.');
    },
    destroyed () {
        this.$store.unregisterModule('info');
    },
    computed: {
        info(){
            return this.$store.state.info.info;
        }
    }
}
</script>

