<template>
  <h1>My Bookcase</h1>
  <div class="flex flex-wrap">
    <div
      v-for="book in books"
      :key="book.key"
      class="book-item"
    >
      <img
        :src="`//covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`"
        :alt="book.title"
      />
      <div class="text-lg">{{ book.title }}</div>
      <div class="text-md">{{ book.authors[0].name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from "vue";
import { Work } from "../models/books";
import bookApi from "../http/bookapi";

export default defineComponent({
  setup() {
    const books: Ref<Work[]> = ref([]);

    onMounted(async () => await load("science_fiction"));

    async function load(category: string) {
      const result = await bookApi(category);
      if (result) books.value = result;
    }

    return {
      books,
    };
  },
});
</script>
