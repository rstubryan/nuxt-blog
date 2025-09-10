<script setup lang="ts">
import LoginForm from "@/components/organisms/form/login/login-form.vue";
import { useHead } from "nuxt/app";

useHead({
  title: "Login",
});
</script>

<template>
  <NuxtLayout name="auth">
    <LoginForm />
  </NuxtLayout>
</template>
