<script setup lang="ts">
import LoginForm from "@/components/organisms/form/login/login-form.vue";
import { useHead } from "nuxt/app";

useHead({
  title: "Login",
});
</script>

<template>
  <div
    class="flex h-screen w-full items-center justify-center max-w-md mx-auto"
  >
    <LoginForm />
  </div>
</template>
