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

#post{
  background-image: url("./img/postBg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.footer-card {
  text-align: left;
  margin-top: 2rem;
}

.containerHover {
  position: relative;
  width: 50%;
}

.image {
  opacity: 1;
  display: block;
  width: 100%;
  height: auto;
  transition: .5s ease;
  backface-visibility: hidden;
}

.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.containerHover:hover .image {
  opacity: 0.5;
}

.containerHover:hover .middle {
  opacity: 1;
}

.text {
  font-size: 16px;
  padding: 16px 32px;
}



</style>
