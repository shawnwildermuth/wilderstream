<template>
  <img :src="`//covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`" :alt="book.title" />
  <div class="text-lg">{{ book.title }}</div>
  <div class="text-md">{{ book.authors[0].name }}</div>
</template>

<script lang="ts">
  import { defineComponent } from "@vue/runtime-core";
  
  export default defineComponent({
    name: "Book",
    props: {
      book: {
        type: Object,
        required: true
      }
    }
  });
</script>
