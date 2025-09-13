<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Loader2 } from "lucide-vue-next";

const isVerifying = ref(true);

onMounted(() => {
  isVerifying.value = false;
});
</script>

<template>
  <div class="flex h-screen w-full items-center justify-center px-4">
    <template v-if="isVerifying">
      <Loader2 class="animate-spin h-8 w-8 text-gray-500" />
    </template>
    <template
      v-else
      class="flex h-screen w-full items-center justify-center px-4"
    >
      <slot />
    </template>
  </div>
</template>
