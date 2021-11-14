<template>
  <div>
    <div class="flex items-center flex-col">
      <h3>Login</h3>
      <form class="auth-form" novalidate>
        <div class="flex flex-col">
          <label for="username">User name:</label>
          <input
            type="email"
            name="username"
            v-model="rules.creds.email.$model"
            placeholder="e.g. jack@aol.com"
            autofocus
          />
          <validation-message :field="rules.creds.email"></validation-message>
          <label for="password">Password:</label>
          <input
            type="password"
            name="password"
            v-model="rules.creds.password.$model"
          />
          <validation-message
            :field="rules.creds.password"
          ></validation-message>
          <div>
            <button
              type="submit"
              class="btn btn-success"
              :disabled="rules.creds.$invalid"
            >
              Login
            </button>
            <router-link class="btn btn-cancel" to="/">Cancel</router-link>
          </div>
          <div v-if="state">
            {{ state }}
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import ValidationMessage from "../components/ValidationMessage.vue";

export default defineComponent({
  components: {
    ValidationMessage,
  },
  setup() {
    const creds = reactive({
      email: "",
      password: "",
    });

    const state = ref("");

    return {
      creds,
      state,
      rules: useVuelidate(),
    };
  },
  validations() {
    return {
      creds: {
        email: {
          required,
          email,
        },
        password: {
          required,
        },
      },
    };
  },
});
</script>

<style scoped>
.auth-form {
  @apply w-1/2 border-solid border rounded border-gray-200 p-2;
}

.auth-form label {
  @apply font-bold text-red-900 ml-1;
}

.auth-form input[type="email"],
input[type="password"] {
  @apply rounded-md bg-gray-50 focus:bg-green-100;
}
</style>
