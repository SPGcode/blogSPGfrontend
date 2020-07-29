<template>
  <div>
    <b-card v-if="!active">
      <b-card-text>
        <h6>Name: {{ userName }}</h6> </b-card-text
      ><b-card-text>
        <h6>Mail: {{ userEmail }}</h6>
      </b-card-text>
      <b-card-text>
        <h6>User from: {{ userDateCreate }}</h6>
      </b-card-text>
      <b-card-text>
        <h6>Role: {{ userRole }}</h6>
      </b-card-text>
      <b-button variant="primary" @click="activate(userId)"
        >Go to edit</b-button
      >
    </b-card>
    <b-card v-if="active">
        <b-form-group>
            <b-form-input
              type="text"
              class="form-control my-2"
              v-model="editUser.name"
            ></b-form-input>
            <label>
                new password:
            </label>
            <b-form-input
              type="password"
              class="form-control my-2"
              v-model="editUser.pass"
            ></b-form-input>
             <label>
                Repeat password:
            </label>
            <b-form-input
              type="password"
              class="form-control my-2"
              v-model="editUser.newPass"
            ></b-form-input>
            <p style="color: red;"> {{ print }} </p>
        </b-form-group>
    <b-button variant="primary" @click="editUserCurrent(editUser)"
      >upload</b-button
    >
    <b-button class="ml-2" variant="danger" @click="active = false"
      >back</b-button
    >
    </b-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      userName: "",
      userId: "",
      userDateCreate: "",
      userEmail: "",
      userRole: "",
      active: false,
      editUser: {},
      print: ""
    };
  },
  computed: {
    ...mapState({
      userDB: (state) => state.usersModule.userDB,
    }),
  },
  created() {
      (this.userName = this.userDB.data.name),
      (this.userId = this.userDB.data._id),
      (this.userDateCreate = this.userDB.data.date),
      (this.userEmail = this.userDB.data.mail),
      (this.userRole = this.userDB.data.role);
  },
  methods: {
    ...mapActions(['closeSession']),
    activate(id) {
      console.log(id);
      this.active = true;
      this.axios
      .get(`/user/${id}`)
      .then(response => {
          this.editUser = response.data
      })
      .catch(err => console.log(err))
    },
     editUserCurrent(user) {
       if(this.editUser.pass === this.editUser.newPass){
       console.log(user)
       this.axios
       .put(`/user/${user._id}`, user)
       .then((res) => {
         this.closeSession();
       })
      .catch((err) => {
         console.log(err.response);
       });
       }else{
         this.print = "passwords don't match";
       }
    }
  },
};
</script>
