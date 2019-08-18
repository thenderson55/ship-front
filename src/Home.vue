<template>
  <div class="body">
    <CreateTwoot/>
    <br/>
    <Twoots/>
  </div>
</template>


<script>
import CreateTwoot from './components/CreateTwoot.vue'
import Twoots from './components/Twoots.vue'


export default {
  name: 'Home',
  components: {
    Twoots,
    CreateTwoot
  }
}
</script>

<style>
.body {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>


