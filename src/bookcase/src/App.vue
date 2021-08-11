<template>
  <div class="container bg-white mx-auto p-2">
    <Bookcase />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Bookcase from "./views/bookcase.vue";

export default defineComponent({
  name: 'App',
  components: {
    Bookcase
  }
})
</script>

