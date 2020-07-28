const state = {
    message: {
        color: "",
        text: ""
    }
  }

const getters = {
    getMessage: state => state.message
}

const actions = {
    changeColor({commit}, color){
        commit('setColor', color)
    }, 
    changeText({commit}, text){
        commit('setText', text)
    }
}

const mutations = {
    setColor: (state, payload) => state.message.color = payload,
    setText: (state, payload) => state.message.text = payload
}


export default {
    state,
    mutations,
    actions,
    getters
}