import { useVerifyTokenMutation } from "@/composables/services/auth/mutation";
import { useAuthStore } from "@/composables/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const { verifyToken } = useVerifyTokenMutation();

  if (to.path === "/dashboard" && !authStore.accessToken) {
    await verifyToken();
  }

  if (to.path === "/login") {
    const isVerified = await verifyToken();
    if (isVerified) {
      return navigateTo("/dashboard");
    }
  }
});
