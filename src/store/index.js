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
    userDataName: ''
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
    },
    setUserData(state, payload){
      state.userDataName = payload
    }
  },
  actions: {
    keepUser({commit}, payload){
      localStorage.setItem('token', payload);

      commit('getUser', payload)
    },
    getDataUser({commit}, payload){
      const user = payload
      localStorage.setItem('name', user.name)
      commit('setUserData', user.name)
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
    readName({commit}){
      const name = localStorage.getItem('name');
      commit('setUserData', name)
    }
  },
  getters: {
    userActive: state => !!state.token,
  }
})
