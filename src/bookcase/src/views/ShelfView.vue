<template>
  <h1>My Bookshelf</h1>
  <div class="flex flex-wrap">
    <div v-for="book in shelf" :key="book.key"  class="book-item">
      <Book :book="book" actionText="Remove from Shelf" @bookAction="remove(book)" ></Book>
    </div>
    <div v-if="shelf.length == 0">
      <p>No books in your library <router-link to="/add">click here</router-link> to search for new books.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import store from "../store";
import Book from "../components/BookControl.vue";
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
