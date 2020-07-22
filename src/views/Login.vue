<template>
  <div class="container my-4">
    <b-card id="login" title="Login" style="max-width: 20rem" class="mb-2 mx-auto shadow p-3 mb-5 rounded">
      <b-form @submit.prevent="login">
        <b-form-group>
          <b-form-input
            type="email"
            class="form-control my-2"
            placeholder="Email"
            v-model="user.mail"
          >
          </b-form-input>
          <b-form-input
            type="password"
            class="form-control my-2"
            placeholder="Password"
            v-model="user.pass"
          >
          </b-form-input>
        </b-form-group>
        <b-button class="btn-success btn-block my-2 mx-2" type="submit">
          Login
        </b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import router from '../router'

export default {
  data() {
    return {
      user: {
        mail: "",
        pass: "",
      },
    };
  },
  methods: {
    ...mapActions(["keepUser"]),

    login() {
      this.axios
        .post("/login", this.user)
        .then((res) => {
          const token = res.data.token;
          this.keepUser(token);
          router.push({name: 'Post'});
        })
        .catch((err) => {
          console.error(err.response);
        });
    },
  },
};
</script>
