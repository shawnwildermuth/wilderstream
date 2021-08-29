<template>
  <h1>Find Book</h1>
  <div>
    <label for="category">Book Categories: </label>
    <select id="categories" @change="load()" v-model="currentCategory">
      <option v-for="c in categories" :key="c.id" :value="c.id">{{
        c.name
      }}</option>
    </select>
  </div>
  <div>Shelf Size: {{ shelfSize}}</div>
  <div class="flex flex-wrap">
    <div v-for="book in books" :key="book.key" class="book-item">
      <Book :book="book"></Book>
      <div><button class="btn"  @click="add(book)" :disabled="bookOnShelf(book)">Add to Shelf</button></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from "vue";
import { Work } from "../models/books";
import Book from "../components/Book.vue";

import store from "../store";

export default defineComponent({
  components: {
    Book
  },
  setup() {
    const books = computed(() => store.state.bookList);
    const shelfSize = computed(() => store.state.shelf.length);
    
    const categories = [
      { id: "science_fiction", name: "Science Fiction" },
      { id: "biography", name: "Biography" },
      { id: "science", name: "Science" },
      { id: "technology", name: "Technology" },
    ];

    const currentCategory = ref(store.state.currentCategory);

    onMounted(async () => await load());

    async function load() {
      await store.dispatch("loadBookList", currentCategory.value);
    }

    function add(book: Work) {
      store.dispatch("addBookToShelf", book);
    }

    function bookOnShelf(book: Work) {
      const result = store.state.shelf.findIndex(b => b.key == book.key);
      return result > -1;
    }

    return {
      books,
      categories,
      load,
      currentCategory,
      add,
      shelfSize,
      bookOnShelf
    };
  },
});
</script>
