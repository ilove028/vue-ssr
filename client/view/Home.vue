<template>
  <div>Home Page.</div>
</template>
<script>
export default {
  asyncData({ store, route }){
      return store.dispatch('queryItems');
  },
  computed: {
      items(){
          return this.$store.state.items;
      }
  }
}
</script>
