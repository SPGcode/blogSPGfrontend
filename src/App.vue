<template>
  <div id="app">
    <nav-bar/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import  { mapActions } from 'vuex';
import navBar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
    components:{
      navBar,
      Footer
    },
    methods: {
      ...mapActions(['readToken'])
    },
    created() {
      this.readToken();
    },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
