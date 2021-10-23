<template>
  <div class="book-control">
    <div class="flex">
      <div
        class="book-control-img"
        :style="{ 'background-image': 'url(' + coverUrl + ')' }"
      ></div>
      <div>
        <div class="text-lg">{{ book.title }}</div>
        <div class="text-md">{{ book.author }}</div>
        <div v-if="showAction">
          <button class="btn" @click='$emit("bookAction", book)' :disabled="disabled">
            Add to Shelf
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Book } from "../models/Book";
import store from "../store";

export default defineComponent({
  name: "BookControl",
  props: {
    book: {
      type: Object as () => Book,
      required: true,
    },
    actionText: {
      type: String
    },
    showAction: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {

    let coverUrl = props.book.coverUrl;
    if (!coverUrl || coverUrl.includes("undefined")) coverUrl = "img/nocover-jpg"
    return {
      coverUrl,
      action: () => {
        emit("bookAction", props.book);
      },
      bookOnShelf: () => store.getters.isBookOnShelf(props.book),
    };
  },
});
</script>

<style lang="postcss">
.book-control {
  @apply p-1 m-1 w-72 border-solid border border-gray-200;
}

.book-control .book-control-img {
  @apply w-24 h-36 bg-contain bg-no-repeat m-1;
}
</style>
