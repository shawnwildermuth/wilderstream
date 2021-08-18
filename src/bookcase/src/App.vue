<template>
  <div class="container bg-white mx-auto p-2">
    <div v-if="isBusy" class="text-4xl text-yellow-600">Loading!</div>
    <div v-if="error" class="text-4xl text-red-500">{{ error }}</div>
    <Bookcase />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Bookcase from "./views/bookcase.vue";
import store from "./store";

export default defineComponent({
  name: 'App',
  components: {
    Bookcase
  }, 
  setup() {
    const isBusy = computed(() => store.state.isBusy);
    const error = computed(() => store.state.error);

    return {
      isBusy,
      error
    };
  }
})
</script>

