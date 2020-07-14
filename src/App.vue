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
h1, p {
  font-family: 'Bangers', cursive;
}
body {
  background-image: url("./img/paper.jpg")
}

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

#btn {
  background-color: #A37A5A;
}

#post, #login{
  border: black 2px solid;
}

.footer-card {
  text-align: left;
  margin-top: 2rem;
}
</style>
