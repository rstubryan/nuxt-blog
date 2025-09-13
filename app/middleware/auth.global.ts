import { useAuthStore } from "@/composables/stores/auth";
import { useCookie } from "nuxt/app";
import type { UserProps } from "../composables/services/auth/type";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const userCookie = useCookie("user");

  if (!authStore.isAuthenticated && userCookie.value) {
    try {
      const { $axios } = useNuxtApp();
      const response = await $axios.get<{ user: UserProps }>("/user");
      authStore.setUser(response.data.user);
    } catch (error) {
      console.error("Failed to validate user:", error);
      userCookie.value = null;
    }
  }

  if (to.path === "/dashboard" && !authStore.isAuthenticated) {
    return navigateTo("/login");
  }

  if (to.path === "/login" && authStore.isAuthenticated) {
    return navigateTo("/dashboard");
  }
});
