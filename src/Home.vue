<template>
  <div class="body">
    <CreateTwoot/>
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
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

