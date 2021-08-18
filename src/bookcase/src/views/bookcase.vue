<template>
  <h1>My Bookcase</h1>
  <div>
    <label for="category">Book Categories: </label>
    <select id="categories" @change="load(currentCategory)" v-model="currentCategory">
      <option v-for="c in categories" :key="c.id" :value="c.id">{{
        c.name
      }}</option>
    </select>
  </div>
  <div>Shelf Size: {{ shelfSize}}</div>
  <div class="flex flex-wrap">
    <div v-for="book in books" :key="book.key" class="book-item">
      <img
        :src="`//covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`"
        :alt="book.title"
      />
      <div class="text-lg">{{ book.title }}</div>
      <div class="text-md">{{ book.authors[0].name }}</div>
      <div><button @click="add(book)" :disabled="bookOnShelf(book)">Add to Shelf</button></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from "vue";
import { Work } from "../models/books";
import store from "../store";

export default defineComponent({
  setup() {
    const books = computed(() => store.state.bookList);
    const shelfSize = computed(() => store.state.shelf.length);

    const categories = [
      { id: "science_fiction", name: "Science Fiction" },
      { id: "biography", name: "Biography" },
      { id: "science", name: "Science" },
      { id: "technology", name: "Technology" },
    ];
    const currentCategory = ref("science_fiction");

    onMounted(async () => await load("science_fiction"));

    async function load(category: string) {
      await store.dispatch("loadBookList", category);
    }

    function add(book: Work) {
      store.dispatch("addBookToShelf", book);
    }

    function bookOnShelf(book: Work) {
      return store.state.shelf.find(b => b.key === book.key);
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
