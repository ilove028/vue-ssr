<template>
  <div>
    <h1>Hello World.</h1>
    <router-link to="/about">About</router-link>
    <router-link to="/admin/a">A</router-link>
    <router-link to="/admin/b">B</router-link>
    <router-link to="/admin/c">C</router-link>
    <ul>
      <li v-for="item of items" v-text="item.name" :key="item.name"></li>
    </ul>
</div>
</template>
<script>
  export default {
    asyncData({ store }){
        return store.dispatch('queryItems');
    },
    computed: {
        items(){
            // console.info('Home compute item invoked.');
            return this.$store.state.items;
        }
    }
  };
</script>
