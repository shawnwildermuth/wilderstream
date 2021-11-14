<template>
  <div
    class="validation-item"
    v-for="(error, index) of field.$errors"
    :key="index"
  >
    <div class="message">{{ error.$message }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    field: {
      required: true,
      type: Object
    }
  }
})
</script>

<style scoped>
.validation-item {
  color: red;
}

.validation-item .message {
  font-size: .9em;
}
</style>