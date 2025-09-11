<script setup lang="ts">
import LoginForm from "@/components/organisms/form/login/login-form.vue";
import { useHead } from "nuxt/app";
import { ref, onMounted } from "vue";

useHead({
  title: "Login",
});

const isVerifying = ref(true);

onMounted(() => {
  setTimeout(() => {
    isVerifying.value = false;
  }, 500);
});
</script>

<template>
  <NuxtLayout name="auth">
    <template v-if="isVerifying">
      <div class="flex justify-center items-center h-full">
        <p>Verifying authentication...</p>
      </div>
    </template>
    <template v-else>
      <LoginForm />
    </template>
  </NuxtLayout>
</template>
