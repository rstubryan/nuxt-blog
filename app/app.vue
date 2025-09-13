<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import "vue-sonner/style.css";
import { onBeforeMount } from "vue";

const { $axios } = useNuxtApp();

onBeforeMount(async () => {
  try {
    await $axios.get("/csrf-cookie");
  } catch (error) {
    console.error("Error during fetching CSRF cookie:", error);
  }
});
</script>

<template>
  <div>
    <Toaster class="pointer-events-auto" />
    <NuxtPage />
  </div>
</template>
