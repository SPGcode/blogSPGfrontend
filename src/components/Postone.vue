<template>
    <div>
       <h1 style="color: blue;"> {{ post.title }} </h1>
        <div class="col-sm-12 d-block" v-if="!edit">
                  <b-alert
          :show="dismissCountDown"
          dismissible
          :variant="message.color"
          @dismissed="dismissCountDown = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>{{ message.text }}</p>
        </b-alert>
        <b-card
          id="post"
          img-src="https://picsum.photos/600/300/?image=22"
          img-alt="Image"
          img-top
          :title="post.title"
          class="mb-2 d-block shadow p-4 mb-5 rounded"
        >
          <b-card-body>
            <b-card-text>{{ post.description }}</b-card-text>
            <b-button
              class="btn-info mr-2 btn-sm"
              @click="activateEdit($route.params.id)"
              >Edit</b-button
            >
            <b-card-text class="text-muted footer-card"><small style="font-style: italic">{{ post.date }}</small></b-card-text>
          </b-card-body>
        </b-card>
      </div>
       <div class="col-sm-12 d-block" v-if="edit">
        <b-card
          id="post"
          img-src="https://picsum.photos/600/300/?image=22"
          img-alt="Image"
          img-top
          class="mb-2 d-block shadow p-4 mb-5 rounded"
        >
        <b-form-group>
            <b-form-input
              type="text"
              class="form-control my-2"
              v-model="EditPost.title"
            ></b-form-input>
            <b-form-textarea
              type="text"
              class="form-control my-2"
              v-model="EditPost.description"
            ></b-form-textarea>
        </b-form-group>
          <b-card-body>
            <b-button
              class="btn-info mr-2 btn-sm"
              @click="editPost(EditPost)"
              >Update</b-button
            >
                        <b-button
              class="btn-warning mr-2 btn-sm"
              @click="!edit"
              >Cancel</b-button
            >
            <b-card-text class="text-muted footer-card"><small style="font-style: italic">{{ post.date }}</small></b-card-text>
          </b-card-body>
        </b-card>
      </div>
    </div>
</template>

<script>
import router from '../router';

export default {
    name: "postone",
     data() {
    return {
      post: {},
      dismissSecs: 3,
      dismissCountDown: 0,
      message: { color: "", text: "" },
      EditPost: {},
      edit: false,
    };
  },
  created() {
      this.getPost(this.$route.params.id)
  },
  methods: {
    getPost(id){
           this.axios
           .get(`/post/${id}`)
           .then(res => this.post = res.data)
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
         this.post.title = res.data.title;
         this.post.description = res.data.description;
         this.message.color = "success";
         this.message.text = "Post successfully edited";
         this.showAlert();
         this.edit = false;
         router.push({name: 'Post'})
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
}
</script>