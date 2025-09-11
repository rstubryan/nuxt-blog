<script setup lang="ts">
import { useHead } from "nuxt/app";
import { useLogoutMutation } from "@/composables/services/auth/mutation";
import { ref, onMounted } from "vue";

useHead({
  title: "Dashboard",
});

const { logout } = useLogoutMutation();
const isVerifying = ref(true);

onMounted(() => {
  setTimeout(() => {
    isVerifying.value = false;
  }, 500);
});
</script>

<template>
  <NuxtLayout name="protected">
    <template v-if="isVerifying">
      <div class="flex justify-center items-center h-full">
        <p>Verifying authentication...</p>
      </div>
    </template>
    <template v-else>
      Hello World
      <button
        class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        @click="logout"
      >
        Logout
      </button>
    </template>
  </NuxtLayout>
</template>
