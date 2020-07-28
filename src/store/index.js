import Vue from 'vue'
import Vuex from 'vuex'
import usersModule from './modules/users'
import postsModule from './modules/posts'
import messagesModule from './modules/messages'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    usersModule,
    postsModule,
    messagesModule
  }
})