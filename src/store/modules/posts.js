import axios from 'axios'

const state = {
    posts: []
}

const getters = {
    allPosts: state => state.posts
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
            commit('setPost', response.data)
            //this.message.color = "success";
            //this.message.text = "Post added";
            //this.showAlert();
          })
          .catch((err) => {
            console.log(err.response);
            // if (err.response.data.err.message) {
            //   this.message.text = err.response.data.err.message;
            // } else {
            //   this.message.text = "System error";
            // }
            // this.message.color = "danger";
            // this.showAlert();
          });
      },
}

const mutations = {
    setAllPosts: (state, payload) => ( state.posts = payload),
    setPost: (state, payload) => (state.posts.push(payload))
}

export default {
    state,
    getters,
    mutations,
    actions
}