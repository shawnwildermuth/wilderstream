<template>
  <div
    v-if="isBusy"
    class="
      w-full
      h-full
      opacity-50
      bg-black
      fixed
      z-50
      flex
      justify-center
      items-center
    "
  >
    <div class="text-2xl text-white p-1">
      <fa-icon icon="spinner" spin /> Loading!
    </div>
  </div>
  <div class="container bg-white mx-auto m-0 min-h-screen">
    <header class="flex justify-between bg-blue-800 text-white p-2">
      <div class="p-1 text-3xl">
        <router-link to="/" class="no-underline text-white"
          ><fa-icon icon="book" /> Your Bookshelf</router-link
        >
      </div>
      <ul class="flex list-none menu m-0 items-center">
        <li class="ml-0 mr-1">
          <router-link to="/" class="menu-item">Home</router-link>
        </li>
        <li class="ml-0 mr-1">
          <router-link to="/add" class="menu-item">Add to Library</router-link>
        </li>
        <li class="ml-0 mr-1" v-if="isAuthenticated">
          <router-link to="/logout" class="menu-item"><fa-icon icon="lock"></fa-icon> {{ fullName}} (logout)</router-link>
        </li>
        <li class="ml-0 mr-1" v-if="!isAuthenticated">
          <router-link to="/login" class="menu-item"><fa-icon icon="user"></fa-icon> Login</router-link>
        </li>
      </ul>
    </header>
    <div v-if="error" class="text-xl bg-red-500 text-white p-1">
      <fa-icon icon="exclamation" transform="shrink-6" mask="circle" />
      {{ error }}
    </div>
    <main class="p-1">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import store from "./store";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const isBusy = computed(() => store.state.isBusy);
    const error = computed(() => store.state.error);
    const fullName = computed(() => store.state.user.fullName);
    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    onMounted(() => store.dispatch("loadShelf"));

    return {
      isBusy,
      error,
      isAuthenticated,
      fullName
    };
  },
});
</script>

<style lang="postcss">
.menu {
  @apply mr-4;
}

.menu li a {
  @apply no-underline py-2 px-1 hover:bg-blue-600 text-white rounded;
}

.menu li:not(:last-child):after {
  content: " |";
}
</style>
