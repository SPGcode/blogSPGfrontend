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
  },
  mutations: {
    getUser(state, payload){
      state.token = payload;
      if(payload === ''){
        state.userDB = '';
      } else{
        state.userDB = decode(payload);
        router.push({name: 'Post'});
      }
    }
  },
  actions: {
    keepUser({commit}, payload){
      localStorage.setItem('token', payload);

      commit('getUser', payload)
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
    },
  },
  getters: {
    userActive: state => !!state.token,
  }
})
