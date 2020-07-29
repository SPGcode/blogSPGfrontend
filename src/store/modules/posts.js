import axios from 'axios'

const state = {
    posts: []
}

const getters = {
    allPosts: state =>  [...state.posts].reverse()
}

const actions = {
    async getAllPosts({commit}){ 
         await axios
        .get("/posts")
        .then(response =>{ commit('setAllPosts', response.data) })
        .catch(err => console.log(err))
    },
    async addPost({commit}, post) {
        let config = {
          headers: {
            token: localStorage.getItem("token"),
          },
        };
        await axios
          .post("/new-post", post, config)
          .then((response) => {
            console.log(response.data)
            commit('setPost', response.data);
          })
          .catch((err) => {
            console.log(err.response);
          });
      },
    async deletePost({commit},id) {
      console.log(id)
         await axios         
         .delete(`/post/${id}`)
         .then((res) => {
         let posts = state.posts
         const index = posts.findIndex(
         (item) => item._id === res.data._id);
         commit("deletePost", index);
         location.reload();
         })
        .catch((err) => {
          console.log(err.response);
        });
      },
      addImage(file){
        
      }
}

const mutations = {
    setAllPosts: (state, payload) => (state.posts = payload),
    setPost: (state, payload) => (state.posts.push(payload)),
    deletePost: (state, i) => (state.posts.splice(i, 1))
}

export default {
    state,
    getters,
    mutations,
    actions
}