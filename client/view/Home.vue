<template>
  <div>
    <h1>Hello World.</span>
    <ul>
      <li v-for="item of items" v-text="item.name"></li>
    </ul>
  </div>
</template>
<script>
export default {
  asyncData({ store, route }){
      return store.dispatch('queryItems');
  },
  computed: {
      items(){
          console.info('Home compute item invoked.');
          return this.$store.state.items;
      }
  }
}
</script>
