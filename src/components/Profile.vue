<template>
  <div>
    <h1>🙂 Hi {{ userName }} this is your Profile area 😉</h1>
    <div>
      <b-card :title="userName" body-class="text-left">
       <b-card-text>
            <Dataprofile/>
        </b-card-text>
        </b-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Dataprofile from './Dataprofile'

export default {
  name: "porfile",
  components:{
      Dataprofile
  },
  data() {
      return {
          userName: "",
      }
  },
  computed: {
     ...mapState({
      userDB: state => state.usersModule.userDB,
    }),
  },
  created() {
      this.userName = this.userDB.data.name;
  },

};
</script>
