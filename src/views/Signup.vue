<template>
  <div class="container my-4">
    <b-card
    id="login"
    title="Signup"
    style="max-width: 20rem"
    class="mb-2 mx-auto shadow p-3 mb-5 rounded"
    >
        <b-form @submit.prevent="addUser">
            <b-form-group>
                <b-form-input
                type="text"
                class="form-control my-2"
                placeholder="Name"
                v-model="newUser.name"
                >
                </b-form-input>
                <b-form-input
                type="email"
                class="form-control my-2"
                placeholder="Email"
                v-model="newUser.mail"
                >
                </b-form-input>
                <b-form-input
                type="password"
                class="form-control my-2"
                placeholder="Password"
                v-model="newUser.pass"
                >
                </b-form-input>
            </b-form-group>
            <b-button 
            class="btn-success btn-block my-2 mx-2" 
            type="submit"
            >
            Send
            </b-button>
        </b-form>
    </b-card>
  </div>
</template>

<script>
import router from '../router'

export default {
    data() {
        return {
            newUser: {}
        }
    },
    methods: {
        addUser(){
            this.axios.post('/new-user', this.newUser)
            .then(res => {
                console.log(res.data);
                router.push({name: 'login'});
            })
            .catch(err =>{
                console.log(err.response)
            })
        }
    },
}
</script>