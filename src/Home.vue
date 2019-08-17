<template>
  <div>
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
