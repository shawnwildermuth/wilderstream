<template>
  <div class="container bg-white mx-auto p-2">
    <header>
      <ul class="flex list-none">
        <li class="ml-0 mr-1"><router-link to="/" class="btn">Home</router-link></li>
        <li class="ml-0 mr-1"><router-link to="/add" class="btn">Add to Library</router-link></li>
      </ul>
    </header>
    <div v-if="isBusy" class="text-4xl text-yellow-600">Loading!</div>
    <div v-if="error" class="text-4xl text-red-500">{{ error }}</div>
    <router-view></router-view>
</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import store from "./store";

export default defineComponent({
  name: 'App',
  components: {
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

