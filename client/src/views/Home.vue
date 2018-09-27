<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <!-- profile, search , recently followed -->
        <leftCp/>


        <!-- from post, post list -->
        <contentCp/>


        <!-- who to follow -->
        <rightCp/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import leftCp from '@/components/left.vue'
import contentCp from '@/components/content.vue'
import rightCp from '@/components/right.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    leftCp,
    contentCp,
    rightCp
  }
}
</script>
