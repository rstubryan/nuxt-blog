<script setup lang="ts">
import { useHead } from "nuxt/app";
import { useLogoutMutation } from "@/composables/services/auth/mutation";
import { ref, onMounted } from "vue";
import { Loader2 } from "lucide-vue-next";

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
        <Loader2 class="animate-spin h-8 w-8 text-gray-500" />
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
