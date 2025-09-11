<script setup lang="ts">
import { useHead } from "nuxt/app";
import { useAuthStore } from "@/composables/stores/auth";
import { useLogoutMutation } from "@/composables/services/auth/mutation";
import { ref, onMounted } from "vue";

useHead({
  title: "Dashboard",
});

const { logout } = useLogoutMutation();
const authStore = useAuthStore();
const isLoading = ref(!authStore.accessToken);

onMounted(() => {
  isLoading.value = !authStore.accessToken;
});
</script>

<template>
  <NuxtLayout name="protected">
    <template v-if="isLoading">
      <p>Loading...</p>
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
