<template>
  <h1>My Bookshelf</h1>
  <div class="flex flex-wrap">
    <div v-for="book in shelf" :key="book.key"  class="book-item">
      <Book :book="book"></Book>
      <div><button class="btn" @click="remove(book)">Remove from Shelf</button></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import store from "../store";
import Book from "../components/Book.vue";
import { Work } from "../models/books";

export default defineComponent({
  components: {
    Book,
  },
  setup() {
    const shelf = ref(store.state.shelf);

    function remove(book: Work) {
      store.dispatch("removeBookFromShelf", book);
    }

    return {
      shelf,
      remove
    };
  },
});
</script>
