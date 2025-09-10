<script setup lang="ts">
import { useHead } from "nuxt/app";
import { useLogoutMutation } from "@/composables/services/login/mutation";

useHead({
  title: "Dashboard",
});

const { logout } = useLogoutMutation();
</script>

<template>
  <NuxtLayout name="protected">
    Hello World
    <button
      class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      @click="logout"
    >
      Logout
    </button>
  </NuxtLayout>
</template>
