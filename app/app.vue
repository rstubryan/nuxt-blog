<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import "vue-sonner/style.css";
</script>

<template>
  <div>
    <Toaster class="pointer-events-auto" />
    <NuxtPage />
  </div>
</template>
