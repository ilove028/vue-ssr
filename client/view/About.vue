<template>
  <div>About Page.</div>
</template>
<script>
import aboutModule from '../store/module/about';

export default {
    asyncData({ store }){
        store.registerModule('about', aboutModule);
        return store.dispatch('about/increment');
    },
    destroyed () {
        this.$store.unregisterModule('about');
    },
    computed: {
        count(){
            return this.$store.state.about.count;
        }
    }
}
</script>
