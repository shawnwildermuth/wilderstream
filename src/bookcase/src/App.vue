<template>
  <div class="container bg-white mx-auto p-2 m-0 min-h-screen">
    <header class="flex justify-between">
      <h1><router-link to="/"  class="no-underline text-blue-700"><fa-icon icon="book" /> Your Bookshelf</router-link></h1>
      <ul class="flex list-none menu">
        <li class="ml-0 mr-1"><router-link to="/" class="menu-item">Home</router-link></li>
        <li class="ml-0 mr-1"><router-link to="/add" class="menu-item">Add to Library</router-link></li>
      </ul>
    </header>
    <div v-if="isBusy" class="text-4xl text-yellow-600">Loading!</div>
    <div v-if="error" class="text-4xl text-red-500">{{ error }}</div>
    <router-view></router-view>
</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import store from "./store";

export default defineComponent({
  name: 'App',
  components: {
  }, 
  setup() {
    const isBusy = computed(() => store.state.isBusy);
    const error = computed(() => store.state.error);

    onMounted(() => store.dispatch("loadShelf"));

    return {
      isBusy,
      error
    };
  }
})
</script>

<style lang="postcss">

.menu {
  @apply mr-4   text-blue-700;
}

.menu li a {
  @apply no-underline py-2 px-1  text-blue-700 hover:bg-blue-100;
}

.menu li:not(:last-child):after {
  content: " |"
}
</style>

