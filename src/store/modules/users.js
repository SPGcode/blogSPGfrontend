import router from '../../router'

//jwt decode token
import decode from 'jwt-decode'

const state = {
    token: '',
    userDB: '',
  }

const getters = {
      userActive: state => !!state.token,
      }

const actions = {
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
    }
  }

const mutations = {
  getUser(state, payload){
    state.token = payload;
    if(payload === ''){
      state.userDB = '';
    } else{
      state.userDB = decode(payload);
    }
  }
}


export default {
    state,
    mutations,
    actions,
    getters
}
