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
        <b-form @submit.prevent="editPost(EditPost)" v-if="edit">
          <h3>Edit Post</h3>
          <b-form-group>
            <b-form-input
              type="text"
              class="form-control my-2"
              placeholder="title"
              v-model="EditPost.title"
            ></b-form-input>
            <b-form-textarea
              type="text"
              class="form-control my-2"
              placeholder="Description"
              v-model="EditPost.description"
            ></b-form-textarea>
          </b-form-group>
          <b-button class="btn-success my-2 mx-2" type="submit">Save</b-button>
          <b-button class="btn-danger my-2" type="submit" @click="edit = false"
            >Cancel</b-button
          >
        </b-form>
        <b-form @submit.prevent="addPost" v-if="!edit">
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
      <div class="col-sm-12 d-block" v-for="(post, index) in posts" :key="index">
        <b-card
          id="post"
          img-src="https://picsum.photos/600/300/?image=22"
          img-alt="Image"
          img-top
          :title="post.title"
          class="mb-2 d-block"
          v-if="userId === post.userId"
        >
          <b-card-body>
            <b-card-text>{{ post.description }}</b-card-text>
            <b-button
              class="btn-info mr-2 btn-sm"
              @click="activateEdit(post._id)"
              >Edit</b-button
            >
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
import { mapState } from "vuex";
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
    ...mapState(["token", "userDB"]),
  },
  created() {
    const userDbId = this.userDB.data._id;
    this.userName = this.userDB.data.name;
    this.userId = userDbId;
    this.showPosts();
  },
  methods: {
    showPosts() {
      let config = {
        headers: {
          token: this.token,
        },
      };
      this.axios
        .get("/posts", config)
        .then((res) => {
          this.posts = res.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    addPost() {
      let config = {
        headers: {
          token: this.token,
        },
      };
      this.axios
        .post("/new-post", this.NewPost, config)
        .then((res) => {
          console.log(res.data)
          this.posts.push(res.data);
          this.NewPost.title = "";
          this.NewPost.name = "";
          this.NewPost.description = "";
          this.message.color = "success";
          this.message.text = "Post added";
          this.showAlert();
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.data.err.message) {
            this.message.text = err.response.data.err.message;
          } else {
            this.message.text = "System error";
          }
          this.message.color = "danger";
          this.showAlert();
        });
    },
    activateEdit(id) {
      this.edit = true;
      this.axios
        .get(`/post/${id}`)
        .then((res) => {
          this.EditPost = res.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    editPost(item) {
      this.axios
        .put(`/post/${item._id}`, item)
        .then((res) => {
          const index = this.posts.findIndex((p) => p._id === res.data._id);
          this.posts[index].title = res.data.title;
          this.posts[index].description = res.data.description;
          this.message.color = "success";
          this.message.text = "Post successfully edited";
          this.showAlert();
          this.edit = false;
        })
        .catch((err) => {
          console.log(err.response);
        });
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
