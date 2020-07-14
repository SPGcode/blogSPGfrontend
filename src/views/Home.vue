<template>
  <div class="home container mt-4">
    <h1>Welcome to <strong style="font-style: italic;">Nice Blog</strong></h1>
    <h2 class="text-muted mb-4">News</h2>
    <div class="row">
      <div class="col-sm-4" v-for="(post, index) in posts" :key="index">
        <b-card 
        id="post"
        img-src="https://picsum.photos/600/300/?image=20"
        img-alt="Image"
        img-top
        :title="post.title" 
        style="max-width: 20rem;" 
        class="mb-2">
          <b-card-body>
            <b-card-text>{{ post.description }}</b-card-text>
            <b-card-text class="text-muted footer-card" style="font-style: italic;"
              >Written by: {{ post.userName }}</b-card-text
            >
            <b-card-text class="text-muted footer-card"><small style="font-style: italic">{{ post.date }}</small></b-card-text>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      posts: {},
    };
  },
  created() {
    this.axios
      .get("/posts")
      .then((res) => {
        this.posts = res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
};
</script>
