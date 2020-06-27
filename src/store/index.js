import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

//jwt decode token
import decode from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userDB: '',
    userData: ''
  },
  mutations: {
    getUser(state, payload){
      state.token = payload;
      if(payload === ''){
        state.userDB = '';
      } else{
        state.userDB = decode(payload);
        console.log(state.userData)
        router.push({name: 'Post'});
      }
    },
    setUserData(state, payload){
      state.userData = payload
    }
  },
  actions: {
    keepUser({commit}, payload){
      localStorage.setItem('token', payload);
      commit('getUser', payload)
    },
    getDataUser({commit}, payload){
      const user = payload
      commit('setUserData', user)
    },
    closeSession({commit}){
      commit('getUser', '');
      localStorage.removeItem('token');
      router.push({name: 'login'});
    },

    //keep session active
    readToken({commit}){
      const token = localStorage.getItem('token');
      if(token){
        commit('getUser', token);
      }else{
        commit('getUser', '');
      }
    }
  },
  getters: {
    userActive: state => !!state.token
  }
})
