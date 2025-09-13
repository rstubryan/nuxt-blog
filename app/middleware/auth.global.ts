import { useAuthStore } from "@/composables/stores/auth";
import { useCookie } from "nuxt/app";
import type { UserProps } from "../composables/services/auth/type";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const userCookie = useCookie("user");

  if (!authStore.isAuthenticated && userCookie.value) {
    try {
      const user = userCookie.value as unknown as UserProps;
      authStore.setUser(user);
    } catch (error) {
      console.error("Error setting user from cookie:", error);
    }
  }

  if (to.path === "/dashboard" && !authStore.isAuthenticated) {
    return navigateTo("/login");
  }

  if (to.path === "/login" && authStore.isAuthenticated) {
    return navigateTo("/dashboard");
  }
});
