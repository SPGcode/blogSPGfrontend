<template>
  <div class="container mt-2">
    <div class="row">
      <div class="col-sm-4">
        <b-alert
          :show="dismissCountDown"
          dismissible
          :variant="message.color"
          @dismissed="dismissCountDown = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>{{ message.text }}</p>
        </b-alert>
        <b-form @submit.prevent="handleAdd(NewPost)" v-if="!edit">
          <h3>New Post</h3>
          <b-form-group>
            <b-form-input
              type="text"
              class="form-control my-2"
              placeholder="title"
              required
              v-model="NewPost.title"
            ></b-form-input>
            <b-form-textarea
              type="text"
              class="form-control my-2"
              placeholder="Description"
              required
              v-model="NewPost.description"
            ></b-form-textarea>
          </b-form-group>
          <b-button class="btn-success my-2 btn-block" type="submit">Add</b-button>
        </b-form>
      </div>
      <div class="col-sm-6 mt-4">
        <h2>Welcome {{ userName }}! here you can see your posts or public a new one...</h2>
        <h1>🙂 Your  "Nice Blog"  area  😉</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 d-block containerHover" v-for="(post, index) in posts" :key="index">
        <b-card
          id="post"
          img-src="https://picsum.photos/600/300/?image=22"
          img-alt="Image"
          img-top
          :title="post.title"
          class="mb-2 d-block shadow p-4 mb-5 rounded image"
          v-if="userId === post.userId"
        >
          <b-card-body>
            <b-card-text>{{ post.description }}</b-card-text>
            <router-link :to="{ name: 'postview', params: {id: post._id}}" >
              <b-button
              class="btn-info mr-2 btn-sm middle"
              >Show</b-button
            >
            </router-link>
            <b-button class="btn-danger btn-sm" @click="deletePost(post._id)"
              >Delete</b-button
            >
            <b-card-text class="text-muted footer-card"><small style="font-style: italic">{{ post.date }}</small></b-card-text>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

//jwt decode token
import decode from "jwt-decode";


export default {
  data() {
    return {
      posts: [],
      userName: "",
      userId: "",
      dismissSecs: 3,
      dismissCountDown: 0,
      message: { color: "", text: "" },
      NewPost: { title: "", name: "", description: "" },
      EditPost: {},
      edit: false,
    };
  },
  computed: {
    ...mapState({
      token: state => state.usersModule.token,
      userDB: state => state.usersModule.userDB,
    }),
    ...mapGetters(['allPosts'])

  },
  created() {
    const userDbId = this.userDB.data._id;
    this.userName = this.userDB.data.name;
    this.userId = userDbId;
    this.getAllPosts();
    this.posts = this.allPosts;
  },
  methods: {
    ...mapActions(['getAllPosts', 'addPost']),
    async handleAdd(post){
      await this.addPost(post)
      await this.clearForm()
        //estos dos metodos de abajo se repiten en el created(), cambiar a otro lifecycle method
      this.getAllPosts();
      this.posts = this.allPosts;
    },
    clearForm (){
        this.NewPost.title = "";
        this.NewPost.name = "";
        this.NewPost.description = "";
    },
    deletePost(id) {
      this.axios
        .delete(`/post/${id}`)
        .then((res) => {
          const index = this.posts.findIndex(
            (item) => item._id === res.data._id
          );
          this.posts.splice(index, 1);
          this.message.color = "success";
          this.message.text = "Post deleted";
          this.showAlert();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>