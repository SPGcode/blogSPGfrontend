<template>
  <div class="home">
    <!-- <img alt="logo" src="../assets/logo.jpg"> -->
    <h1>Home page</h1>
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
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      posts: {}
    }
  },
  created() {
    this.axios
        .get("/posts")
        .then((res) => {
          this.posts = res.data;
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err.response);
        });
  },
}
</script>
