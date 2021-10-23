<template>
  <h1>Find Books</h1>
  <div>
    <label for="search">Search: </label>
    <input id="search" v-model="searchPhrase" @keyup.enter="doSearch()" autofocus placeholder="e.g. Lord of the Rings" />
    <button class="btn" @click="doSearch()">Search</button>
  </div>
  <div class="flex flex-wrap">
    <BookControl v-for="book in books" 
    :key="book.key" 
    :book="book" 
    @bookAction="add"
    :disabled="isBookOnShelf(book)">
    </BookControl>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { Book } from "../models/book";
import BookControl from "../components/BookControl.vue";

import store from "../store";

export default defineComponent({
  components: {
    BookControl
  },
  setup() {
    const books = computed(() => store.state.bookList);
    
    const searchPhrase = ref("");

    function doSearch() {
      store.dispatch("searchForBooks", searchPhrase.value);
    }

    function add(book: Book) {
      store.dispatch("addBookToShelf", book);
    }

    return {
      isBookOnShelf: store.getters.isBookOnShelf,
      searchPhrase,
      books,
      add,
      doSearch
    };
  },
});
</script>
