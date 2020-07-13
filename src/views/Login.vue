<template>
  <div class="container my-4">
    <b-card title="Login" style="max-width: 20rem" class="mb-2 mx-auto">
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
        <b-button class="btn-info btn-block my-2 mx-2" type="submit">
          Login
        </b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";

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
        })
        .catch((err) => {
          console.error(err.response);
        });
    },
  },
};
</script>
