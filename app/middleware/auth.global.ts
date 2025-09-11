import { useVerifyTokenMutation } from "@/composables/services/auth/mutation";
import { useAuthStore } from "@/composables/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const { verifyToken } = useVerifyTokenMutation();

  if (to.path === "/dashboard") {
    if (!authStore.accessToken) {
      const isVerified = await verifyToken(false);
      if (!isVerified) {
        return navigateTo("/login");
      }
    }
  }

  if (to.path === "/login") {
    const isVerified = await verifyToken(false);
    if (isVerified) {
      return navigateTo("/dashboard");
    }
  }
});
