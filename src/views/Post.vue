<template>
  <div class="container">
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
      <b-button class="btn-warning my-2 mx-2" type="submit">Edit</b-button>
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
      <b-button class="btn-info my-2 btn-block" type="submit">Add</b-button>
    </b-form>
    </div>
    <div class="col-sm-6">
      <h2>Yeah! here you can publish a post: {{ userData }} </h2>
    </div>
    </div>
    <div class="row">
      <div class="col-sm-4" v-for="(item, index) in posts" :key="index">
        <b-card
        :title= item.title
        style="max-width: 20rem;"
        class="mb-2"
        >
          <b-card-body>
            
            <h6 class="card-subtitle mb-2 text-muted">{{item.name}}</h6>
            <b-card-text>{{ item.description }}</b-card-text>
            <b-button
              class="btn-info mr-2 btn-sm"
              @click="activateEdit(item._id)"
              >Edit</b-button
            >
            <b-button class="btn-danger btn-sm" @click="deletePost(item._id)"
              >Delete</b-button
            >
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      posts: [],
      dismissSecs: 3,
      dismissCountDown: 0,
      message: { color: "", text: "" },
      NewPost: { title: "",name: "", description: "" },
      EditPost: {},
      edit: false,
    };
  },
  created() {
    this.showPosts();
  },
  methods: {
    showPosts() {
      let config = {
        headers: {
          token: this.token
        }
      }
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
          token: this.token
        }
      }
      this.axios
        .post("/new-post", this.NewPost, config)
        .then((res) => {
          console.log(res.data)
          this.posts.push(res.data);
          this.NewPost.title = "";
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
          this.message.text = "Post edited success";
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
  computed: {
    ...mapState(['token', 'userData'])
  },
};
</script>
