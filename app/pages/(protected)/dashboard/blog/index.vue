<script setup lang="ts">
import { useHead } from "nuxt/app";

useHead({
  title: "Blog CMS",
});
</script>

<template>
  <NuxtLayout name="protected"> <div class="">Hello World</div> </NuxtLayout>
</template>
