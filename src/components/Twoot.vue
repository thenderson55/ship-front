<template>
  <!-- TODO conditional render if twoot user id equals this.user -->
  <div class="form-group input-group twoot">
    <p class="form-control content" rows="3">{{twoot.content}}</p>
    <div>
      <div class="name" v-bind:class="{ 'center-avatar' : twoot.user.email == userEmail}" >
        <!-- <router-link :to="`/profile/${twoot.user.id}`" class="link"> -->
        <router-link :to="{ name: 'profile', params: {id: twoot.user.id, username: twoot.user.username } }" class="link">
          <img v-bind:src="`${twoot.user.avatar}`" class="avatar">
          <p>

          {{twoot.user.username}}
          </p>
        </router-link>
      </div>
      <button v-if="twoot.user.email !== userEmail" v-on:click="() => followFunction(twoot.user.email)" class="btn-s btn-success follow" v-text="buttonText"></button>
      <button v-else v-on:click="() => followFunction(twoot.user.email)" class="disable" :disabled="true"></button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Twoot",
  computed:{
    ...mapGetters(['userEmail'])
  }, 
  props: {
    twoot: Object,
    buttonText: String,
    followFunction: Function
  },
}
</script>

<style >
.content {
  height: 100px;
}
.name {
  margin:0!;
  padding:0!;
  width: 127px;
  height: 71px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  border-top-right-radius: 3px;
  background-color: RGB(5, 123, 247); 
}
.name:hover {
  color: white;
  background-color: RGB(5, 123, 230);
}

.link {
  margin-top: 20px;
  text-align: center;
  color: white;
}
.link:hover {
  text-decoration: none; 
}

.follow {
  border-radius: 0px;
  border-bottom-right-radius: 3px;
  width: 100%;
  margin-bottom: -7px;
}
.avatar {  
  width: 40px;
  height: 40px;
  z-index: 1;
  position: relative;
  overflow: hidden;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(71, 81, 93);
  border-image: initial;
  border-radius: 50%;
}

.center-avatar {
  height: 100px
}

.disable {
  display: none;
}

.follow:focus,.follow:active {
  outline: none !important;
  box-shadow: none !important;
}

</style>
